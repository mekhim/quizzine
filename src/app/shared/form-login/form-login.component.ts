import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../types/user.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  private readonly _form: FormGroup;
  private readonly _cancel$: EventEmitter<void>;
  constructor() {
    this._form = this._buildForm();
    this._cancel$=new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  get form(): FormGroup {
    return this._form;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  cancel(): void{
    this._cancel$.emit();
  }

  submit(user: User) {

  }

  private _buildForm() {
    return new FormGroup({
      username: new FormControl('',Validators.compose([Validators.required,Validators.minLength(2)])),
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(2)])),
    })
  }
}
