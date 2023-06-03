import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Credentials } from '../models/credentials';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private _httpClient: HttpClient,
    private _router: Router) { }


  login(creds: Credentials) {
    return this._httpClient.post(environment.API_LOGIN, creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const header = response.headers;

      const bearerToken = header.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');

      localStorage.setItem('token', token);
      return body;
    }))
  }

  getToken() {
    return localStorage.getItem('token');
  }

  validateToken() {
    let token = localStorage.getItem('token');

    if (token) {
      return true;
    }
    else return false;
  }

  logOut() {
    localStorage.clear();
    this._router.navigate(['']);
  }

}
