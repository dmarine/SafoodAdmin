import * as Cookies from "js-cookie";

import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Config } from '../config/config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authorized: boolean = false

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private config: Config, private router: Router) { }

  public async isAuthenticated(): Promise<boolean> {
    const token: string = this.jwtHelper.tokenGetter();
    const checkToken: boolean = (token != null && !this.jwtHelper.isTokenExpired(token))
    if(!checkToken) { return checkToken }

    const user: User = await this.getUser().toPromise()
    if(user.role) { this.isAuthorized() }
    return this.authorized;
  }

  public getUser(): Observable<User> {
    return this.http.post<User>(`${this.config.API_URL}/api/auth/me`, null)
  }

  private notAuthorized() {
    this.authorized = false
  }

  private isAuthorized() {
    this.authorized = true
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.config.API_URL}/api/auth/login`, { email, password }).toPromise().then(response => {
      Cookies.set('token', response.access_token, { expires: (150.12 / response.expires_in) })
      Cookies.set('token', response.access_token, { domain: this.config.SITE_URL })

      if(response.user.role) { this.router.navigate(['/']) } else { document.location.href = this.config.SITE_URL }
    })
  }
}