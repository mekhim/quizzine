import { Injectable } from '@angular/core';
import {Question} from "../types/question.type";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Tag} from "../types/tag.type";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private readonly _backendURL: any;
  private readonly _defaultTag: Tag;

  constructor(private _http: HttpClient) {
    this._defaultTag = {
      name: 'fruit',
      image : 'https://2.bp.blogspot.com/-he6irVNp93Q/V1r3YqdIkUI/AAAAAAAABlg/NDA_-UIGW8kU_iqYc3ugMGQ1OIIxYnsVQCLcB/s1600/blbtehfw-fotolia_30662478_s.jpg',
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
   * Function to return list of tags
   */
  fetch(): Observable<Tag[]> {
    return this._http.get<Tag[]>(this._backendURL.allTags)
      .pipe(
        filter((tags: Tag[]) => !!tags),
        defaultIfEmpty([] as Tag[])
      );
  }



  /**
   * Function to return one tag for current name
   */
  fetchOne(name: string): Observable<Tag> {
    return this._http.get<Tag>(this._backendURL.oneTag.replace(':name',name));
  }

  /**
   * Function to create a new question
   */
  create(tag: Tag): Observable<any> {
    return this._http.post<Question>(this._backendURL.allTags, tag, this._options());
  }

  /**
   * Function to update one question
   */
  update(name: string, tag: Tag): Observable<any> {
    return this._http.put<Question>(this._backendURL.oneTag.replace(':name', name), tag, this._options());
  }

  /**
   * Function to delete one question for current id
   */
  delete(name: string): Observable<string> {
    return this._http.delete(this._backendURL.oneTag.replace(':name', name))
      .pipe(
        map(() => name)
      );
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }


}
