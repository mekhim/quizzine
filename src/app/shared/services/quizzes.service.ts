import { Injectable } from '@angular/core';
import {Question} from "../types/question.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

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

}
