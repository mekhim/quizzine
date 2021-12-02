import { Component } from '@angular/core';
import {DialogComponent} from "./shared/dialog/dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "./shared/types/user.type";
import {UsersService} from "./shared/services/users.service";
import {filter, map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quizzine';
  isLogin: any;


  private _userDialog: MatDialogRef<DialogComponent, User> | undefined;

  constructor() {

  }


  ngOnInit(): void{
  }

  get appName(){
    return "Quizzine";
  }


}
