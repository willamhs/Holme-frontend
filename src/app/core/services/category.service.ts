import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/category.model';
import { PageableResponse } from '../../shared/models/pageable.response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = `${environment.baseURL}/admin/category`;
  private http = inject(HttpClient);

  constructor() { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL);
  }  

  paginateCategories(
    page: number,
    size: number
  ): Observable<PageableResponse<Category>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageableResponse<Category>>(`${this.baseURL}/page`, { params });
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseURL}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseURL, category);
  }

  updateCategory(
    id: number,
    category: Category
  ): Observable<Category> {
    return this.http.put<Category>(`${this.baseURL}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`);
  }

}
