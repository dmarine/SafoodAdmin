import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  baseUrl: string = `${this.config.API_URL}/api/foods`;

  constructor(private http: HttpClient, private config: Config) { }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.baseUrl}`);
  }

  getFood(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}/${id}`);
  }

  createFood(food: Food): Observable<Food> {
    console.log(food)
    return this.http.post<Food>(`${this.baseUrl}`, food);
  }

  updateFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.baseUrl}/${food.id}`, food);
  }

  deleteFood(food: Food): Observable<Food> {
    return this.http.delete<Food>(`${this.baseUrl}/${food.id}`);
  }
}