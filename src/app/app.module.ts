import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NavbarComponent} from "./navbar/navbar.component";
import { FormComponent } from './shared/form/form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import { QuestionComponent } from './shared/question/question.component';
import { HomeComponent } from './home/home.component';
import { FormLoginComponent } from './shared/form-login/form-login.component';
import { ListQuizzesComponent } from './list-quizzes/list-quizzes.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DialogComponent } from './shared/dialog/dialog.component';
import { UserComponent } from './user/user.component';
import {MatInputModule} from "@angular/material/input";
import { QuizCardComponent } from './shared/quiz-card/quiz-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import { QuizComponent } from './quiz/quiz.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ResultsComponent } from './results/results.component';
import {Interceptor} from "./interceptors/Interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PluralPipe} from "./shared/pipes/plural.pipe";
import { WrongRouteComponent } from './wrongroute/wrong-route.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,NavbarComponent, FormComponent, QuestionComponent, HomeComponent, FormLoginComponent, DialogComponent, UserComponent, DialogLoginComponent,ListQuizzesComponent, DialogComponent, UserComponent, QuizCardComponent, QuizComponent, ResultsComponent,PluralPipe, WrongRouteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatStepperModule,
    MatRadioModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
