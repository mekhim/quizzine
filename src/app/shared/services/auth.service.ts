import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../types/user.type";
import {LoginResponse} from "../types/login-response.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _backendURL: any;
  private readonly _defaultUser: User;

  constructor(private _http: HttpClient) {
    this._defaultUser = {
      username: 'Michel',
      email: 'michel.berger@gmail.com'
    };

    this._backendURL = {};

    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port){
      baseUrl += `:${environment.backend.port}`;
    }

    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k =>this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);

  }

  /**
   * Function to get the default user
   */
  get defaultUser(): User {
    return this._defaultUser;
  }


  /**
   * Function to register a new user
   */
  register(email: string | undefined, username: string | undefined, password: string | undefined): Observable<any> {
    console.log("Email + totu le reste " + email, username ,password);
    return this._http.post<LoginResponse>(this._backendURL.register,{email, username, password}, this._options());
  }

  /**
   * Function to register a new user
   */
  login(username: string | undefined, password: string | undefined): Observable<any> {
    return this._http.post<LoginResponse>(this._backendURL.login, {username,password}, this._options());
  }


  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}

