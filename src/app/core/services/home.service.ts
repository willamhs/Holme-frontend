import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDetailsResponse } from '../../shared/models/event-details-response.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseURL = `${environment.baseURL}/events`; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) {}

  //Método para obtener los 8 eventos más recientes
  getRecentEvents(): Observable<EventDetailsResponse[]> {
    return this.http.get<EventDetailsResponse[]>(`${this.baseURL}/recent`);
  }

  getEventDetailsById(id: number): Observable<EventDetailsResponse> {
    return this.http.get<EventDetailsResponse>(`${this.baseURL}/${id}`);
  }
}
