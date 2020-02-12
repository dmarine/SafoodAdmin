import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { Restaurant } from '../models/restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  baseUrl: string = `${this.config.API_URL}/api/restaurants`;

  constructor(private http: HttpClient, private config: Config) { }

  getRestaurants(): Observable<Array<Restaurant>> {
    return this.http.get<Array<Restaurant>>(`${this.baseUrl}`);
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/${id}`);
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.baseUrl}`, restaurant);
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.baseUrl}/${restaurant.id}`, restaurant);
  }

  deleteRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.delete<Restaurant>(`${this.baseUrl}/${restaurant.id}`);
  }
}