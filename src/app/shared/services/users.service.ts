import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter, map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Stats, User} from "../types/user.type";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _backendURL: any;
  private readonly _defaultUser: User;

  //constructor
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

  get defaultUser(): User {
    return this._defaultUser;

  }


  /**
   * Function to return list of user
   */
  fetch(): Observable<User[]> {
    return this._http.get<User[]>(this._backendURL.allUsers)
      .pipe(
        filter((users: User[]) => !!users),
        defaultIfEmpty([] as User[])
      );
  }



  /**
   * Function to return one user for current id
   */
  fetchOne(id: string): Observable<User> {
    return this._http.get<User>(this._backendURL.oneUserId.replace(':id',id));
  }

  /**
   * Function to return one user for current username
   */
  fetchOneByName(username: string): Observable<User> {
    return this._http.get<User>(this._backendURL.oneUserName.replace(':username',username));
  }

  /**
   * Function to create a new question
   */
  create(user: User): Observable<any> {
    return this._http.post<User>(this._backendURL.allUsers, user, this._options());
  }

  /**
   * Function to update one question
   */
  update(id: string, user: User): Observable<any> {
    return this._http.put<User>(this._backendURL.oneUserId.replace(':id', id), user, this._options());
  }

  /**
   * Function to delete one question for current id
   */
  delete(id: string): Observable<any> {
    return this._http.delete<User>(this._backendURL.delete.replace(':id', id))
      .pipe(
        map(() => id)
      );
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}

