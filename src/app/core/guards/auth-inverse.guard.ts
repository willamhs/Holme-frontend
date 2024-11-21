import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //Verifica si el usuario esta autenticado
  if (authService.isAuthenticated()) {
    //Obtiene el rol de usuario
    const userRole = authService.getUserRole();

    //Redirige segun el rol del usuario
    if (userRole === 'CUSTOMER') {
      router.navigate(['/customer']); //Redirige a la pagina de customers
    } else if (userRole === 'ADMIN') {
      router.navigate(['/admin']); //Redirige a la pagina de administradores
    }

    // Bloquea el acceso a las rutas de autenticacion si el usuario esta autenticador
    return false;
  }
  //Permite el acceso a la ruta si el usuario no esta autenticado
  return true;
};
