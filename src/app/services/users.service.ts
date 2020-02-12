import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = `${this.config.API_URL}/api/users`;

  constructor(private http: HttpClient, private config: Config) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${user.id}`);
  }
}