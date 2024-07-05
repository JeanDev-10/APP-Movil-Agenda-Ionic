import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
* TODO: Validar que las contraseñas sean iguales en profile
*/
export const passwordMatchValidatorProfile: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('new_password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
};
