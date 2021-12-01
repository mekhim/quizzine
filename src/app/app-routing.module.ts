import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionComponent} from "./shared/question/question.component";
import {HomeComponent} from "./home/home.component";
import {FormLoginComponent} from "./shared/form-login/form-login.component";
import {FormComponent} from "./shared/form/form.component";
import {QuizComponent} from "./quiz/quiz.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'signIn', component: FormLoginComponent},
  {path: 'signUp', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
