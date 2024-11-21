import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EventDetailsResponse } from '../../shared/models/event-details-response.model';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  private baseURL = `${environment.baseURL}/customer-event-interest`;

  constructor(private http: HttpClient) {}

  addInterest(eventId: number): Observable<any> {
    return this.http.post(`${this.baseURL}`, { eventId });
  }

  removeInterest(eventId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${eventId}`);
  }

  getUserInterests(): Observable<{ eventId: number }[]> {
    return this.http.get<{ eventId: number }[]>(`${this.baseURL}/customer`);
  }
  

  // Nuevo método para verificar si un evento está en favoritos
  isEventFavorite(eventId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}/is-favorite/${eventId}`);
  }

  
}
