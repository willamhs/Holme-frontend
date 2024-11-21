import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PageableResponse } from '../../shared/models/pageable.response.model';
import { Location } from '../../shared/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseURL = `${environment.baseURL}/admin/location`;
  private http = inject(HttpClient);

  constructor() { }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseURL);
  }

  paginateLocations(
    page: number,
    size: number
  ): Observable<PageableResponse<Location>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageableResponse<Location>>(`${this.baseURL}/page`, { params });
  }
  
  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseURL}/${id}`);
  }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.baseURL, location);
  }

  updateLocation(
    id: number,
    location: Location
  ): Observable<Location> {
    return this.http.put<Location>(`${this.baseURL}/${id}`, location);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

}
