import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  ResourceType, ResourceCategory } from './../../shared/models/resource-details-response.model';
import { Resource } from './../../shared/models/resource.model';
import { ResourceCreateUpdateRequest } from './../../shared/models/resource-details-response.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = '/api/resources';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.apiUrl);
  }

  getById(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.apiUrl}/${id}`);
  }

  create(resource: ResourceCreateUpdateRequest): Observable<Resource> {
    return this.http.post<Resource>(this.apiUrl, resource);
  }

  update(id: number, resource: ResourceCreateUpdateRequest): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}/${id}`, resource);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filter(title?: string, category?: ResourceCategory, type?: ResourceType): Observable<Resource[]> {
    let params = new HttpParams();
    if (title) params = params.append('title', title);
    if (category) params = params.append('category', category);
    if (type) params = params.append('type', type);
    return this.http.get<Resource[]>(`${this.apiUrl}/filter`, { params });
  }

  addComment(resourceId: number, userId: number, content: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${resourceId}/comments`, { userId, content });
  }

  getComments(resourceId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${resourceId}/comments`);
  }
}
