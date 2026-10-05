import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/Auth`; 

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response: AuthResponse) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.name);
        }
      })
    );
  }
}