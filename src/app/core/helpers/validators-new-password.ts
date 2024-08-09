import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
* TODO: Validar que las contraseñas sean iguales en profile
*/
export const passwordMatchValidatorProfile: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('new_password');
  const new_password_confirmation = control.get('new_password_confirmation');

  return password && new_password_confirmation && password.value !== new_password_confirmation.value ? { passwordMismatch: true } : null;
};
