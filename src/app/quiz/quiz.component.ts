import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {StepperOrientation} from "@angular/material/stepper";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {Question} from "../shared/types/question.type";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionsService} from "../shared/services/questions.service";

@Component({
  selector: 'quizzine-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  get formsGroup(): any {
    return this._formsGroup;
  }


  private _formsGroup : FormGroup[];


  private _questions : Question[];

  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _questionsService : QuestionsService,private _router: Router ,private _activatedroute: ActivatedRoute, private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this._questions = [];

    this._formsGroup = [];


  }

  ngOnInit(): void{
    this._questionsService.fetch().subscribe( (_) => {
      this._questions = _;
      for (let i = 0; i < this.questions.length; i++) {
        //build Forms
        this._formsGroup[i] = this._formBuilder.group({
          ctrl: ['', Validators.required],
        });
      }
    })
  }

  get questions(): Question[] {
    return this._questions;
  }

}
