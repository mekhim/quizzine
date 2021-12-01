import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'quizzine-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  get appName() {
    return "Quizzine";
  }
}
