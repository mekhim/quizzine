import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'quizzine-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  get goodAnswers(): number {
    return this._goodAnswers;
  }

  @Input()
  set goodAnswers(value: number) {
    this._goodAnswers = value;
  }

  get totalAnswers(): number {
    return this._totalAnswers;
  }

  @Input()
  set totalAnswers(value: number) {
    this._totalAnswers = value;
  }

  private _totalAnswers : number;
  private _goodAnswers : number;

  constructor() {
    this._totalAnswers = {} as number;
    this._goodAnswers = {} as number;
  }

  ngOnInit(): void {
  }

}
