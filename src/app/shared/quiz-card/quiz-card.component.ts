import {Component, Input, OnInit} from '@angular/core';
import {Tag} from "../types/tag.type";

@Component({
  selector: 'quizzine-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {


  private _quiz : Tag;

  constructor() {
    this._quiz = {} as Tag;
  }

  get quiz(): Tag {
    return this._quiz;
  }

  @Input()
  set quiz(value: Tag) {
    this._quiz = value;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }


}
