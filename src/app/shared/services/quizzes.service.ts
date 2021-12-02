import { Injectable } from '@angular/core';
import {Question} from "../types/question.type";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter} from "rxjs/operators";
import {User} from "../types/user.type";
import {QuestionResponse} from "../types/questionResponse.type";

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  private readonly _backendURL: any;
  private readonly _defaultQuestion: Question;

  constructor(private _http: HttpClient) {
    this._defaultQuestion = {
      question:'Comment est votre blanquette ?',
      answers: ['oui','non',"pourquoi pas"],
      tags: ['viande', 'Gastronomie française'],
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
   * Function to return list of question
   */
  getQuiz(quizSize : number, tags : string[]): Observable<Question[]> {
    return this._http.get<Question[]>(this._backendURL.quizzes + "?quizSize="+quizSize + this.tagsArrayToParams(tags))
      .pipe(
        filter((questions: Question[]) => !!questions),
        defaultIfEmpty([] as Question[])
      );
  }

  tagsArrayToParams(tags : string[]) : string {
    let str = "";
    for (let i = 0; i < tags.length; i++) {
        str = "&" + "tags=" + tags[i];
    }
    return str;
  }

  /**
   * Function to create a new question
   */
  postQuiz(userId : string, questions: QuestionResponse[]): Observable<any> {
    return this._http.post<number[]>(this._backendURL.quizzes, {userId, questions}, this._options());
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
