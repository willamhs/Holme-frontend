import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authData = storageService.getAuthData(); //Obtener los datos de autenticacion
  if (authData && authData.token) {
    //Si hay un token de autenticacion, clonar la solicitud y agregar el encabezado de autorizacion
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authData.token}`)
    });
    return next(authReq);
  }
  //Si no hay datos de autenticacion, pasar la solicitud sin modificar
  return next(req);
};
