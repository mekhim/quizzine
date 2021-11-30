import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quizzine';
  isLogin: any;

  constructor() {
  }

  ngOnInit(): void{
  }

  get appName(){
    return "Quizzine";
  }
}
