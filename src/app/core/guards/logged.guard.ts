import { CanActivateFn } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  //logica de guardia para saber si está logeado o no
  return true;
};
