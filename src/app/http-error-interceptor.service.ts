import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError,retry } from 'rxjs/operators';

 
@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
 
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry(3),
      catchError(err => {
      const error = err.error.message || err.statusText;
      console.log('http error: '+ err.error.status + error)
      return throwError(error);
    }))
  }
}