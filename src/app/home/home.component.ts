import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Tag} from "../shared/types/tag.type";
import {TagsService} from "../shared/services/tags.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'quizzine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  private _tags : Tag[];


  constructor(private _router: Router, private _tagsService : TagsService) {
    this._tags = [];
  }

  ngOnInit(): void {
    this._tagsService.fetch().subscribe(((_: Tag[]) => this.tags = _));
  }

  get tags(): Tag[] {
    return this._tags;
  }

  set tags(value: Tag[]) {
    this._tags = value;
  }

}
