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
  //private _dialogStatus: string;
  private _userDialog: MatDialogRef<DialogComponent, User> | undefined;

  /*constructor(private _usersService: UsersService, private _dialog: MatDialog) {
    this._dialogStatus = 'inactive';
  }

   */

  constructor() {

  }


  ngOnInit(): void{
  }

  get appName(){
    return "Quizzine";
  }

  /*showDialog(): void {
    this._dialogStatus = 'active';

    this._userDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    this._userDialog.afterClosed()
      .pipe(
        filter((user: User | undefined) => !!user),
        map((user: User | undefined) => {
          // delete obsolete attributes in original object which are not required in the API
          delete user?.id;
          return user;
        }),
        mergeMap((user: User | undefined) => this._add(user))
      )
      .subscribe({
        next: (user: User) => this._user = this._user.concat(user),
        error: () => this._dialogStatus = 'inactive',
        complete: () => this._dialogStatus = 'inactive'
      });

  }

   */

  /*
  private _add(user: User | undefined): Observable<User>{
    return this._usersService.create(user as User);
  }

   */


}
