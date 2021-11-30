import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../types/user.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

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
  constructor(private _dialog: MatDialog) {
    this._model = {} as User;
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

}
}
