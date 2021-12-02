import {Component, Input, OnInit} from '@angular/core';
import {Tag} from "../types/tag.type";
import {Router} from "@angular/router";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'quizzine-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {


  private _quiz : Tag;

  constructor(private _router: Router, private _storageService : StorageService) {
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

  /**
   * go to quiz
   */
  navigateToQuiz() {
    this._storageService.tags = [];
    this._storageService.tags.push(this._quiz.name);
    this._router.navigate(['/quiz'])
  }

}
