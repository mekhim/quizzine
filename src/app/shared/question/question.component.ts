import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../types/question.type";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../services/questions.service";
import {filter, mergeMap} from "rxjs/operators";
import {merge} from "rxjs";
import {QuestionResponse} from "../types/questionResponse.type";

@Component({
  selector: 'quizzine-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {


  private readonly _next$: EventEmitter<QuestionResponse>;


  get question(): Question {
    return this._question;
  }

  @Input()
  set question(value: Question) {
    this._question = value;
  }

  private _question : Question;

  constructor(private _route: ActivatedRoute) {
    this._question = {} as Question;
    this._next$ = new EventEmitter<QuestionResponse>();
  }

  ngOnInit(): void {
  }

  @Output('next') get next$(): EventEmitter<QuestionResponse> {
    return this._next$;
  }

  next(response : QuestionResponse) {
    this._next$.emit(response);
  }


}
