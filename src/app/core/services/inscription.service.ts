import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { InscriptionResponse } from '../../shared/models/inscription-response.model';
import { InscriptionCreateUpdateRequest } from '../../shared/models/inscription-create-update.model';



@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private baseURL = `${environment.baseURL }/inscriptions`;
  private http = inject(HttpClient);

  getAllInscription(): Observable<InscriptionResponse[]> {
    return this.http.get<InscriptionResponse[]>(this.baseURL);
  }

  create(
    inscription: InscriptionCreateUpdateRequest
  ): Observable<InscriptionResponse> {
    return this.http.post<InscriptionResponse>(this.baseURL, inscription);
  }

  getInscriptionHistory(): Observable<InscriptionResponse[]> {
    return this.http.get<InscriptionResponse[]>(`${this.baseURL}/user`);
  }

  //getPurchaseReport(): Observable<PurchaseReportResponse[]> {
    //return this.http.get<PurchaseReportResponse[]>(`${this.baseURL}/report`);
  //}

  getInscriptionById(id: number): Observable<InscriptionResponse> {
    return this.http.get<InscriptionResponse>(`${this.baseURL}/${id}`);
  }

  confirmInscription(id: number): Observable<InscriptionResponse> {
    return this.http.put<InscriptionResponse>(`${this.baseURL}/confirm/${id}`, {});
  }
}
