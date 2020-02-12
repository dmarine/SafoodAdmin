import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl: string = `${this.config.API_URL}/api/categories`;

  constructor(private http: HttpClient, private config: Config) { }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${this.baseUrl}`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${category.id}`, category);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.baseUrl}/${category.id}`);
  }
}
