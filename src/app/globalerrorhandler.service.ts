import { ErrorHandler, Injectable } from '@angular/core';
 
//it will handle only exception from front end
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
 
  constructor() { }
  handleError(err: Error) {
  }
}