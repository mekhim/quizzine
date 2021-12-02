import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Component Constructor
   * @param _router
   */
  constructor(private _router: Router) { }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }

}
