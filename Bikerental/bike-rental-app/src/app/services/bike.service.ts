// src/app/services/bike.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Bike {
  id: number;
  name: string;
  type: string;
  hourlyRate: number;
  available: boolean;
  description: string;
  imageUrl: string;
}

export interface RentalRequest {
  bikeId: number;
  startTime: Date;
  endTime: Date;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private apiUrl = 'http://localhost:8093/api/bikes';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all bikes
  getAllBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Bike[]>('getAllBikes', []))
      );
  }

  // Get available bikes
  getAvailableBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${this.apiUrl}/available`)
      .pipe(
        catchError(this.handleError<Bike[]>('getAvailableBikes', []))
      );
  }

  // Get a specific bike
  getBikeById(id: number): Observable<Bike> {
    return this.http.get<Bike>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Bike>('getBikeById'))
      );
  }

  // Rent a bike
  rentBike(rentalRequest: RentalRequest): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.post(`${this.apiUrl}/rent`, rentalRequest, options)
      .pipe(
        catchError(this.handleError<any>('rentBike'))
      );
  }

  // Get user rentals
  getUserRentals(): Observable<any[]> {
    const options = { headers: this.getHeaders() };
    return this.http.get<any[]>(`${this.apiUrl}/rentals/user`, options)
      .pipe(
        catchError(this.handleError<any[]>('getUserRentals', []))
      );
  }

  // Get available bike count (for stats)
  getAvailableBikesCount(): Observable<number> {
    // For now, mock data - in real app would call API
    return of(8);
  }

  // Get active rentals count (for stats)
  getActiveRentalsCount(): Observable<number> {
    // For now, mock data - in real app would call API
    return of(3);
  }

  // Get featured bikes for homepage
  getFeaturedBikes(): Observable<Bike[]> {
    // For now, mock data - in real app would call API
    const bikes: Bike[] = [
      {
        id: 1,
        name: 'Mountain Explorer',
        type: 'Mountain Bike',
        hourlyRate: 12.99,
        available: true,
        description: 'Perfect for rough terrain and mountain trails.',
        imageUrl: '/assets/images/mountain-bike.jpg'
      },
      {
        id: 2,
        name: 'City Cruiser',
        type: 'City Bike',
        hourlyRate: 9.99,
        available: true,
        description: 'Comfortable ride for urban environments.',
        imageUrl: '/assets/images/city-bike.jpg'
      },
      {
        id: 3,
        name: 'Road Runner',
        type: 'Road Bike',
        hourlyRate: 14.99,
        available: true,
        description: 'High-speed bike designed for paved roads.',
        imageUrl: '/assets/images/road-bike.jpg'
      }
    ];
    return of(bikes);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
