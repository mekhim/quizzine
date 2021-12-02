import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(window.sessionStorage.getItem('access_token'))
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${window.sessionStorage.getItem('access_token')}`
      }
    });


    return next.handle(request);
  }
}
