import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
* TODO: Validar que las contraseñas sean iguales en register
*/
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
};
