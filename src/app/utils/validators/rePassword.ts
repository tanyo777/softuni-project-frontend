import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

export function matchValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let areEqual = false;
    if (control.parent) {
      const password: any = control.parent.value[controlName];
      const matchPasswordValue = control.value;

      if (password === matchPasswordValue) {
        areEqual = true;
      }
    }
    return areEqual ? null : { matching: true };
  };
}
