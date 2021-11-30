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
import { QuizzComponent } from './quizz/quizz.component';
import {HttpClientModule} from "@angular/common/http";
import { DialogComponent } from './shared/dialog/dialog.component';
import { UserComponent } from './user/user.component';
import {MatInputModule} from "@angular/material/input";
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@NgModule({
  declarations: [
    AppComponent,NavbarComponent, FormComponent, QuestionComponent, HomeComponent, FormLoginComponent, QuizzComponent, DialogComponent, UserComponent, DialogLoginComponent
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
        MatInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
