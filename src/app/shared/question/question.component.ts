import { Component, OnInit } from '@angular/core';
import {Question} from "../types/question.type";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../services/questions.service";
import {filter, mergeMap} from "rxjs/operators";
import {merge} from "rxjs";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  private _question: Question[];

  constructor(private _questionService: QuestionsService, private _route: ActivatedRoute) {
    this._question = [];
  }

  ngOnInit(): void {
    this._questionService.fetch().subscribe({next: (question: Question[]) =>this._question = question});
  }



}
