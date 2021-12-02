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

  /**
   * Conponent constructor
   * @param _authService
   * @param _dialog
   */
  constructor(private _authService : AuthService,private _dialog: MatDialog) {
    this._model = {} as User;
    this._users = [];
    this._formL = this._buildForm();
    this._submit$=new EventEmitter<User>();
    this._cancel$=new EventEmitter<void>();
    this._dialogStatus = 'inactive';
  }


  /**
   * ngOnInit implementation
   */
  ngOnInit(): void {
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: User){
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): User{
    return this._model;
  }

  /**
   * Returns private property _form
   */
  get formL(): FormGroup {
    return this._formL;
  }


  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }


  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<User>{
    return this._submit$;
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void{
    this._dialogStatus='inactive';
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and user
   */
  submit(user: User): void {
    this._submit$.emit(user);
  }

  /**
   * Function tu build our form
   */
  private _buildForm() {
    return new FormGroup({
      username: new FormControl('',Validators.compose([Validators.required,Validators.minLength(2)])),
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(8)])),
    })
  }

  /**
   * Function to display modal
   */

  showDialog(): void {
    this.cancel();
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._userDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterCloses observable to set dialog status and do process
    this._userDialog.afterClosed().pipe(filter((user: User|undefined) => !!user),
        map((user: User | undefined) => {

          // delete obsolete attributes in original object which are not required in the API
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

  /**
   * Register new user
   * @param user
   * @private
   */
    private _register(user: User|undefined): Observable<User> {
        return this._authService.register(user?.email, user?.username, user?.password);
    }

}
