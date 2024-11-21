import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Price } from '../../shared/models/price.model';
import { PageableResponse } from '../../shared/models/pageable.response.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private baseURL = `${environment.baseURL}/admin/price`;
  private http = inject(HttpClient);

  constructor() { }

  getAllPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(this.baseURL);
  }

  paginatePrices(
    page: number,
    size: number
  ): Observable<PageableResponse<Price>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageableResponse<Price>>(`${this.baseURL}/page`, { params });
  }

  getPriceById(id: number): Observable<Price> {
    return this.http.get<Price>(`${this.baseURL}/${id}`);
  }

  createPrice(price: Price): Observable<Price> {
    return this.http.post<Price>(this.baseURL, price);
  }

  updatePrice(
    id: number,
    price: Price
  ): Observable<Price> {
    return this.http.put<Price>(`${this.baseURL}/${id}`, price);
  }

  deletePrice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

}
