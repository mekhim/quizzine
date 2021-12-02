import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../shared/types/question.type";
import { Router} from "@angular/router";
import {QuestionsService} from "../shared/services/questions.service";
import {QuestionResponse} from "../shared/types/questionResponse.type";
import {QuizzesService} from "../shared/services/quizzes.service";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'quizzine-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {


  set isFinished(value: boolean) {
    this._isFinished = value;
  }
  get goodAnswers(): number {
    return this._goodAnswers;
  }

  set goodAnswers(value: number) {
    this._goodAnswers = value;
  }

  get tags(): string[] {
    return this._tags;
  }

  @Input()
  set tags(value: string[]) {
    this._tags = value;
  }

  get actualQuestion(): number {
    return this._actualQuestion;
  }

  set actualQuestion(value: number) {
    this._actualQuestion = value;
  }

  /**
   * define if the quiz is finished or not
   * @private
   */
  private _isFinished : boolean;

  /**
   * quiz' tags
   */
  private _tags : string[];

  /**
   * questions
   * @private
   */
  private _questions : Question[];

  /**
   * user's answers
   * @private
   */
  private _answers : QuestionResponse[];

  /**
   * number of goodAnswers
   * @private
   */
  private _goodAnswers : number;

  /**
   * actual question
   * @private
   */
  private _actualQuestion : number;

  constructor(private _storageService : StorageService,private _quizzesService : QuizzesService,private _questionsService : QuestionsService,private _router: Router) {

    this._questions = [];

    this._tags = [];

    this._actualQuestion = 0;

    this._answers = [];

    this._isFinished = false;

    this._goodAnswers = 0;
  }

  ngOnInit(): void{
    this._tags = this._storageService.tags;
    this._quizzesService.getQuiz(this._storageService.quizSize ,this._tags).subscribe((_) => {
      this._questions = _;
    })
  }

  get questions(): Question[] {
    return this._questions;
  }

  /**
   * value of the progress bar
   */
  get progressValue() {
    return this._questions.length !== 0 ? (this._actualQuestion/this._questions.length) * 100 : 0;
  }

  get isFinished()  {
    return this._isFinished;
  }

  /**
   * function called when the user answer a question
   * @param question
   */
  next( question : QuestionResponse){
    if(this._actualQuestion < this._questions.length) {
      this._answers[this._actualQuestion] = question;
      this.actualQuestion++;
    if(this._actualQuestion === this._questions.length) {
      let userId = window.sessionStorage.getItem('userId');
      if(userId !== null) {
        this._quizzesService.postQuiz(<string>userId, this._answers).subscribe((_: number[]) => {
          this.goodAnswers = _.reduce((a,b) => a + b, 0)
          this.isFinished = true;
        });
      }
    }
    }
  }

}
