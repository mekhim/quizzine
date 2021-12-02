import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsersService} from "../shared/services/users.service";
import {User} from "../shared/types/user.type";
import {HandlerLoginType} from "../shared/types/handlerLogin-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogLoginComponent} from "../dialog-login/dialog-login.component";
import {filter, map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {HttpEvent} from "@angular/common/http";
import {LoginResponse} from "../shared/types/login-response.interface";
import {UserComponent} from "../user/user.component";

@Component({
  selector: 'quizzine-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  get connectedUsername(): string {
    return this._connectedUsername;
  }

  set connectedUsername(value: string) {
    this._connectedUsername = value;
  }
  private _handlerLogin: HandlerLoginType[];
  private _submit$: EventEmitter<User>;
  private readonly _form: FormGroup;
  private _dialogStatus: string;
  private _userDialog: MatDialogRef<DialogLoginComponent, HandlerLoginType> | undefined;
  private _user: User;
  private _isUpdateMode : boolean;

  private _connectedUsername : string;



  /**
   * Component constructor
   * @param _authService
   * @param _dialog
   * @param _userService
   */
  constructor(private _authService: AuthService, private _dialog: MatDialog, private _userService: UsersService) {
    this._isUpdateMode = false;
    this._submit$ = new EventEmitter<User>();
    this._handlerLogin = [];
    this._form = this._buildForm();
    this._dialogStatus = 'inactive';
    this._user = {} as User;
    this._connectedUsername = "";
  }

  /**
   * Returns private property _isUpdateMode
   */
  get isUpdateMode(): boolean{
    return this._isUpdateMode;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._loadUsername();
  }

  /**
   * Function to handle component update
   * @param record
   */
  ngOnChanges(record: any): void{
    if (record.model && record.model.currentValue) {
      this._user = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._user = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
      };
      this._isUpdateMode = false;
    }

    // update form's values with model
    this._form.patchValue(this._user);
  }

  /**
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Returns name of this App
   */
  get appName(): string {
    return "Quizzine";
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<User> {
    return this._submit$;
  }

  /**
   * Function to emit event to submit form and user
   * @param user
   */
  submit(user: User): void {
    this._submit$.emit(user);

  }



  /**
   * Function to build our form
   * @private
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    })
  }

  /**
   * Function to display modal
   */
  showDialog(): void {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._userDialog = this._dialog.open(DialogLoginComponent, {
      width: '500px',
      disableClose: true
    });

    this._userDialog.afterClosed()
      .pipe(
        filter( (user: HandlerLoginType|undefined) => !!user),
    map((user: HandlerLoginType|undefined) => {
      return user;
    }),
      mergeMap((handlerLogin: HandlerLoginType|undefined) => this._login(handlerLogin?.username, handlerLogin?.password))
    ).subscribe( {
      next: (token: LoginResponse ) => {
        window.sessionStorage.setItem('access_token', token.access_token);
        window.sessionStorage.setItem('userId', token.userId);
        this._loadUsername();
      },
      error: () => this._dialogStatus = 'inactive',
      complete: () => this._dialogStatus = 'inactive'
    });

  }

  /**
   * Function to know a user in connected
   */
  public isLogin():boolean{
    return !!window.sessionStorage.getItem('userId');
  }

  /**
   * Function to delete a user account
   */
  delete() {
    this._userService.delete(<string>window.sessionStorage.getItem('userId')).subscribe();
    this.deconnexion();
  }

  /**
   * Function to disconnect a user
   */
  public deconnexion():void{
    window.sessionStorage.removeItem('access_token');
    window.sessionStorage.removeItem('userId');
    this._clearUsername();
  }

  private _loadUsername() {
    if(window.sessionStorage.getItem('userId') !== null) {
      this._userService.fetchOne(<string>window.sessionStorage.getItem('userId')).subscribe((_:User) => this._connectedUsername = _.username);
    }
  }

  private _clearUsername() {
    this._connectedUsername = "";
  }

  /**
   * Function to connect a user
   * @param username
   * @param password
   * @private
   */
  private _login(username: string | undefined, password: string | undefined): Observable<LoginResponse> {
        return this._authService.login(username, password);
    }
}
