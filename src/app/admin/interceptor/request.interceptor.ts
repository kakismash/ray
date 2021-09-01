import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SessionStorageService } from 'src/service/session-storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor{

  constructor(private sessionService: SessionStorageService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>>{

    let tokenReq = req;
    if (req.url &&
        !req.url.includes('login') && !req.url.includes('public')) {

      const token = this.sessionService
                        .loadUser().token;

      if (token != null &&
          token !== undefined) {
        let clonedRequest = req.clone({ headers: req.headers.append('Authorization', 'Bearer ' + token) });
        clonedRequest = clonedRequest.clone({ headers: clonedRequest.headers.append('userid', '' + this.sessionService.loadUser().id)});

        tokenReq = req.clone(clonedRequest);
        //console.log(tokenReq.headers.get('Authorization'));
      }
    }

    return next.handle(tokenReq);
  }
}
