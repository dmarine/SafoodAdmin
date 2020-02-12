import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends Config {

  constructor(private http: HttpClient) { super() }

  async load() {
    const data = await this.http.get<Config>("app.config.json").toPromise()
    this.API_URL = data.API_URL
    this.SITE_URL = data.SITE_URL
  }
}
