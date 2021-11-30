import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsersService} from "../shared/services/users.service";
import {User} from "../shared/types/user.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogLoginComponent} from "../dialog-login/dialog-login.component";

@Component({
  selector: 'quizzine-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _users: User[];
  private _submit$: EventEmitter<User>;
  private readonly _form: FormGroup;
  private _dialogStatus: string;
  private _userDialog: MatDialogRef<DialogLoginComponent, User> | undefined;


  constructor(private _usersService: UsersService, private _dialog: MatDialog) {
    this._submit$ = new EventEmitter<User>();
    this._users = [];
    this._form = this._buildForm();
    this._dialogStatus = 'inactive';
  }

  ngOnInit(): void {
    this._usersService.fetch().subscribe({next: (users: User[]) => this._users = users})
  }

  get form(): FormGroup {
    return this._form;
  }

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

  submit(user: User): void {
    this._submit$.emit(user);

  }

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
  }
}
