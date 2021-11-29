import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionComponent} from "./shared/question/question.component";
import {HomeComponent} from "./home/home.component";
import {FormLoginComponent} from "./shared/form-login/form-login.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'question', component: QuestionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
