import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "./custom_validators";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  private readonly _form: FormGroup;
  private readonly _isUpdateMode: boolean;

  constructor() {
    this._form = this._buildForm();
    this._isUpdateMode = false;
  }

  get form(): FormGroup{
    return this._form;
  }

  get isUpdateMode(): boolean{
    return this._isUpdateMode;
  }

  ngOnInit(): void {
  }
  private _buildForm(): FormGroup {
    return new FormGroup( {
      email: new FormControl('', Validators.compose([Validators.required, CustomValidators.googleEmail])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      password: new FormControl('', Validators.compose([Validators.required,Validators.minLength(8)])),
    })
  }

}
