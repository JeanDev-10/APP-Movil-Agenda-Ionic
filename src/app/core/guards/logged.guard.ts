import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const localStorageService=inject(LocalStorageService);
	if (localStorageService.loggedIn()) {
		const router = inject(Router);
		router.navigateByUrl('/dashboard');
		return false;
	}
	return true;
};
