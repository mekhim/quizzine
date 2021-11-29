import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter, map} from "rxjs/operators";
import {Question} from "../types/question.type";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
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
    Object.keys(environment.backend.endpointsUser).forEach(k =>this._backendURL[k] = `${baseUrl}${environment.backend.endpointsUser[k]}`);

  }

  get defaultQuestion(): Question {
    return this._defaultQuestion;

  }


  /**
   * Function to return list of question
   */
  fetch(): Observable<Question[]> {
    return this._http.get<Question[]>(this._backendURL.allQuestions)
      .pipe(
        filter((questions: Question[]) => !!questions),
        defaultIfEmpty([] as Question[])
      );
  }



  /**
   * Function to return one question for current id
   */
  fetchOne(id: string): Observable<Question> {
    return this._http.get<Question>(this._backendURL.oneQuestion.replace(':id',id));
  }

  /**
   * Function to create a new question
   */
  create(question: Question): Observable<any> {
    return this._http.post<Question>(this._backendURL.allQuestions, question, this._options());
  }

  /**
   * Function to update one question
   */
  update(id: string, question: Question): Observable<any> {
    return this._http.put<Question>(this._backendURL.oneQuestion.replace(':id', id), question, this._options());
  }

  /**
   * Function to delete one question for current id
   */
  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.oneQuestion.replace(':id', id))
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

