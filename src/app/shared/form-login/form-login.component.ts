import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../types/user.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {filter, map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {UsersService} from "../services/users.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'quizzine-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  private readonly _formL: FormGroup;
  private _dialogStatus: string;
  private _userDialog: MatDialogRef<DialogComponent, User> | undefined;
  private readonly _submit$: EventEmitter<User>;
  private readonly _cancel$: EventEmitter<void>;
  private _model: User;
  private _users: User[];
  constructor(private _authService : AuthService,private _dialog: MatDialog) {
    this._model = {} as User;
    this._users = [];
    this._formL = this._buildForm();
    this._submit$=new EventEmitter<User>();
    this._cancel$=new EventEmitter<void>();
    this._dialogStatus = 'inactive';
  }

  ngOnInit(): void {
  }

  @Input()
  set model(model: User){
    this._model = model;
  }

  get model(): User{
    return this._model;
  }

  get formL(): FormGroup {
    return this._formL;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<User>{
    return this._submit$;
  }

  cancel(): void{
    this._dialogStatus='inactive';
    this._cancel$.emit();
  }

  submit(user: User): void {
    this._submit$.emit(user);
  }

  private _buildForm() {
    return new FormGroup({
      username: new FormControl('',Validators.compose([Validators.required,Validators.minLength(2)])),
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(8)])),
    })
  }

  showDialog(): void {
    this.cancel();
    this._dialogStatus = 'active';

    this._userDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    this._userDialog.afterClosed().pipe(filter((user: User|undefined) => !!user),
        map((user: User | undefined) => {
          delete user?.confirmPassword;
          return user;
        }),
        mergeMap((user: User| undefined) => this._register(user))
      ).subscribe({
        next:(user: User) => this._users = this._users.concat(user),
        error: () => this._dialogStatus = 'inactive',
        complete: () => this._dialogStatus = 'inactive'
      });
    }

    private _register(user: User|undefined): Observable<User> {
        return this._authService.register(user?.email, user?.username, user?.password);
    }

}
