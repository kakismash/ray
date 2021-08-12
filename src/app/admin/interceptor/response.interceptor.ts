import { Router } from '@angular/router';
import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpInterceptor } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/service/auth.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor{

    debounce = false;

    constructor(private auth: AuthService,
                private snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute) { }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>>{

      return next.handle(req)
                 .pipe(tap(res => {}),
              catchError((error: HttpErrorResponse) => {

                console.log('Error: ' + JSON.stringify(error));

                // Ignore Logout errors

/*
                  if (this.debounce){
                    this.debounce = false;
                  } else {
                    this.debounce = true;
*/
                const message = this.message(error);

                if (message){
                  this.snackBar
                      .open(message,
                            'Dismiss',
                            {duration: 3000});
                }

                if (error.status === 401){
                  this.router.navigate(['login']);
                }
//                  }

                return throwError(error);
              }),
              finalize(() => {
                // console.log(`${req.method} '${req.urlWithParams}' ProgressInterceptor --.`);
              }),
            );
    }

    message(error: HttpErrorResponse): string {
      let message: string = error.error;

      if (error.error &&
          error.error.message &&
          error.status !== 0){
        message = error.error.message;
      }

      if (!message || error.status === 0){

        switch (error.status){

          case 0:
            message = error.statusText;
            break;

          case 400: // Bad Request
            console.log(error);
            message = 'You must login';
            break;

          case 404: // Not found
          case 417: // Expectation Failed
          case 424: // Failed Dependency
          case 428: // Precondition Required (attempting to use functionality POS provides)
            message = 'Unexpected error (' + error.status + ')';
            break;

          case 401: // Unauthorized
            message = 'You must login';
            break;

          case 403:
            message = 'You do not have access';
            break;

          case 409: // Conflict (user/store already exists)
            message = 'Try the forgot password option';
            break;

          case 503: // Service Unavailable (used for admin when POS integration or Stripe down)
            // If a message is needed, the server will send it
            break;

          case 510: // Not Extended (used for guest when POS is offline)
            message = error.error.message;
            break;

          case 500:
          default:
            message = 'Unexpected error (' + status + ')';
          }
      }

      return message;
    }
}
