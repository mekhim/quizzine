import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _quizSize : number;

  private _tags : string[]

  constructor() {

    this._tags = [];
    this._quizSize = 10;

  }

  get tags(): string[] {
    return this._tags;
  }

  set tags(value: string[]) {
    this._tags = value;
  }

  get quizSize(): number {
    return this._quizSize;
  }

  set quizSize(value: number) {
    this._quizSize = value;
  }

}
