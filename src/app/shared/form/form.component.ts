import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "./custom_validators";
import {User} from "../types/user.type";

@Component({
  selector: 'quizzine-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  private readonly _form: FormGroup;
  private readonly _isUpdateMode: boolean;
  private _model: User;
  private readonly _cancel$: EventEmitter<void>
  private readonly _submit$: EventEmitter<User>

  /**
   * Component constructor
   */
  constructor() {
    this._model = {} as User;
    this._form = this._buildForm();
    this._isUpdateMode = false;
    this._cancel$ = new EventEmitter<void>();
    this._submit$ = new EventEmitter<User>();
  }

  /**
   * Sets private property _model
   * @param model
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


  get form(): FormGroup{
    return this._form;
  }

  get isUpdateMode(): boolean{
    return this._isUpdateMode;
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void>{
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
   * OnInit implementation
   */
  ngOnInit(): void {
  }
  private _buildForm(): FormGroup {
    let samePass;
    return new FormGroup({
        email: new FormControl('', Validators.compose([Validators.required, CustomValidators.formatEmail])),
        username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
        confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
      },
    )
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void{
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and user
    * @param user
   */
  submit(user: User): void {
    this.submit$.emit({...user, confirmPassword:undefined});
  }
}
