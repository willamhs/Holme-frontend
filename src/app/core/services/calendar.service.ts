import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEventProgrammingDTO } from '../../shared/models/user-event-programming-response.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseURL = `${environment.baseURL}/calendar`; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  getUserEvents(): Observable<UserEventProgrammingDTO[]> {
    return this.http.get<UserEventProgrammingDTO[]>(`${this.baseURL}/user`);
  }
}
