import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone) {}

  handleError(error: Error) {
/*
    this.zone
        .run(() =>
        console.log('Undefined client error')
    );
*/
    console.error('Error from global error handler ', error);
  }
}