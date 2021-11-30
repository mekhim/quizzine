import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UsersService} from "../shared/services/users.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorA implements HttpInterceptor {

  constructor(private  _usersService: UsersService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
