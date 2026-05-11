import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/admin-services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const role = userService.getRole();

  if (role === 'ADMIN') {
    return true;
  }

  router.navigate(['/dashboard']);

  return false;
};
