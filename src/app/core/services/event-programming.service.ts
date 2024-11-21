import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventProgrammingCreateUpdateRequest } from '../../shared/models/event-programming-create-update-request.model';
import { Observable } from 'rxjs';
import { EventProgrammingDetailsResponse } from '../../shared/models/event-programming-details.response.model';

@Injectable({
  providedIn: 'root'
})
export class EventProgrammingService {
  private baseURL = `${environment.baseURL}/event-programming`;
  private http = inject(HttpClient);

  create(dto: EventProgrammingCreateUpdateRequest): Observable<EventProgrammingDetailsResponse> {
    return this.http.post<EventProgrammingDetailsResponse>(this.baseURL, dto);
  }

  update(eventsId: number, schedulesId: number, dto: EventProgrammingCreateUpdateRequest): Observable<EventProgrammingDetailsResponse> {
    return this.http.put<EventProgrammingDetailsResponse>(`${this.baseURL}/${eventsId}/${schedulesId}`, dto);
  }

  delete(eventsId: number, schedulesId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${eventsId}/${schedulesId}`);
  }

  findAll(): Observable<EventProgrammingDetailsResponse[]> {
    return this.http.get<EventProgrammingDetailsResponse[]>(this.baseURL);
  }

  findByIdEvent(eventsId: number): Observable<EventProgrammingDetailsResponse[]> {
    return this.http.get<EventProgrammingDetailsResponse[]>(`${this.baseURL}/event/${eventsId}`);
  }

  findByIdSchedule(schedulesId: number): Observable<EventProgrammingDetailsResponse[]> {
    return this.http.get<EventProgrammingDetailsResponse[]>(`${this.baseURL}/schedule/${schedulesId}`);
  }
}
