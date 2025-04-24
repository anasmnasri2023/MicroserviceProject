import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Velorent {
  id?: number;
  veloId: number;
  userId: string;
  startRentDate: string; // Format: 'YYYY-MM-DD'
  endRentDate: string;
  fromLocation: string;
  toLocation: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN', // ajoute d'autres rôles si nécessaire
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: UserRole;
  enabled: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class RentBikeService {
  private apiUrl = 'http://localhost:8091/velorent';

  constructor(private http: HttpClient) {}

  // Get all Velorents
  getAll(): Observable<Velorent[]> {
    return this.http.get<Velorent[]>(`${this.apiUrl}/all`);
  }

  // Get Velorent by ID
  getById(id: number): Observable<Velorent> {
    return this.http.get<Velorent>(`${this.apiUrl}/${id}`);
  }

  // Create a new Velorent
  create(data: Velorent): Observable<Velorent> {
    return this.http.post<Velorent>(this.apiUrl, data);
  }

  // Update an existing Velorent
  update(data: Velorent): Observable<Velorent> {
    return this.http.patch<Velorent>(this.apiUrl, data);
  }

  // Delete a Velorent by ID
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }

  // Get Velorents by User ID
  getVelorentsByUserId(userId: string): Observable<Velorent[]> {
    return this.http.get<Velorent[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Get Velorents by Start Date
  getVelorentsByStartDate(date: string): Observable<Velorent[]> {
    let params = new HttpParams().set('date', date);
    return this.http.get<Velorent[]>(`${this.apiUrl}/bystartdate`, { params });
  }

  // Get Velorents by End Date
  getVelorentsByEndDate(date: string): Observable<Velorent[]> {
    let params = new HttpParams().set('date', date);
    return this.http.get<Velorent[]>(`${this.apiUrl}/byenddate`, { params });
  }

  // Get Velorents between a date range
  getVelorentsBetweenDates(start: string, end: string): Observable<Velorent[]> {
    let params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<Velorent[]>(`${this.apiUrl}/bydaterange`, { params });
  }
}


