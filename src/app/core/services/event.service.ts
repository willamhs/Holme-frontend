import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDetailsResponse } from '../../shared/models/event-details-response.model';
import { PageableResponse } from '../../shared/models/pageable.response.model';
import { EventCreateUpdateRequest } from '../../shared/models/event-create-update-request.model';
import { AdminEventSalesReportDTO } from '../../shared/models/admin-event-sales-report.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseURL = `${environment.baseURL}/admin/events`;
  private http = inject(HttpClient);

  getEventDetailsById(id: number): Observable<EventDetailsResponse> {
    return this.http.get<EventDetailsResponse>(`${this.baseURL}/${id}`);
  }

  getEventDetails(): Observable<EventDetailsResponse[]> {
    return this.http.get<EventDetailsResponse[]>(`${this.baseURL}`);
  }
  
  paginateEvents(page: number, size: number): Observable<PageableResponse<EventDetailsResponse>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageableResponse<EventDetailsResponse>>(`${this.baseURL}/page`, { params });
  }

  createEvent(event: EventCreateUpdateRequest): Observable<EventDetailsResponse> {
    return this.http.post<EventDetailsResponse>(`${this.baseURL}`, event);
  }

  updateEvent(id:number, event: EventCreateUpdateRequest): Observable<EventDetailsResponse> {
    return this.http.put<EventDetailsResponse>(`${this.baseURL}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);

  }

  getEventsalesReport(): Observable<AdminEventSalesReportDTO[]> {
    return this.http.get<AdminEventSalesReportDTO[]>(`${this.baseURL}/sales-report`);
  }
  
}
