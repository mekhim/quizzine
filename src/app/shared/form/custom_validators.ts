import {AbstractControl, FormControl, FormGroup, ValidationErrors} from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control email with custom validator
   */
  static formatEmail(control: AbstractControl): ValidationErrors | null {
    // returns control
    return /^\w+\.\w+@\w+\.(?:com|fr)$/.test(control.value) ? null : {
      formatEmail: true
    };
  }
}
