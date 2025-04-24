// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8094/api/auth';
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  private loggedInStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private http: HttpClient) {}

  get isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  login(credentials: { userName: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Using the correct property names that match the backend
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers })
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem(this.userKey, JSON.stringify(response.user));
            this.loggedInStatus.next(true);
          }
        }),
        catchError(err => {
          console.error('Login error', err);
          return of(null);
        })
      );
  }

  register(userData: any): Observable<any> {
    // Ensure userData has userName property (not username)
    if (userData.username && !userData.userName) {
      userData.userName = userData.username;
      delete userData.username;
    }

    return this.http.post(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError(err => {
          console.error('Registration error', err);
          return of(null);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.loggedInStatus.next(false);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email })
      .pipe(
        catchError(err => {
          console.error('Reset password error', err);
          return of(null);
        })
      );
  }

  confirmResetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/confirm`, { token, newPassword })
      .pipe(
        catchError(err => {
          console.error('Confirm reset password error', err);
          return of(null);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): any {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  checkLoginStatus(): boolean {
    return !!this.getToken();
  }
}
