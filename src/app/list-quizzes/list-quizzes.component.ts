import {Component, Input, OnInit} from '@angular/core';
import {Tag} from "../shared/types/tag.type";
import {TagsService} from "../shared/services/tags.service";

@Component({
  selector: 'quizzine-list-quizzes',
  templateUrl: './list-quizzes.component.html',
  styleUrls: ['./list-quizzes.component.scss']
})
export class ListQuizzesComponent implements OnInit {



  private _tags : Tag[];

  constructor() {

    this._tags = [];

  }

  ngOnInit(): void {
  }

  get tags(): Tag[] {
    return this._tags;
  }

  @Input()
  set tags(value: Tag[]) {
    this._tags = value;
  }


}
