import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadMediaResponse } from '../../shared/models/upload-media-request.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private baseURL = `${environment.baseURL}/media`;
  private http = inject(HttpClient);

  constructor() { }

  upload(formData: FormData): Observable<UploadMediaResponse> {
    return this.http.post<UploadMediaResponse>(
      `${this.baseURL}/upload`,
      formData
    );
  }

  getMedia(filename: string): Observable<Blob> {
    const url = `${this.baseURL}/${filename}`;
    return this.http.get(url, {responseType: 'blob' });
  }

  deleteMedia(filename: string): Observable<void> {
    const url = `${this.baseURL}/${filename}`;
    return this.http.delete<void>(url);
  }
}
