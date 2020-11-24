import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}


  login(
    username: string,
    password: string
  ): Observable<any> {

    return this.http.post<any>(
      ``, {
        requestType: 'login',
        username,
        password,
      }
    );
  }

  register(
    username: string,
    password: string,
  ): Observable<any> {
    return this.http.post<any>(
      ``, {
        requestType: 'register-user',
        username,
        password
      }
    );
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.getToken();

    return token ? true : false;
  }

  logout(): void {
    this.localStorageService.removeToken();
    location.reload();
  }

}
