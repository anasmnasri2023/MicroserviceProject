// src/app/services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  maxParticipants: number;
  currentParticipants: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8093/api/events';

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

  // Get all events
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Event[]>('getAllEvents', []))
      );
  }

  // Get upcoming events
  getUpcomingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/upcoming`)
      .pipe(
        catchError(this.handleError<Event[]>('getUpcomingEvents', []))
      );
  }

  // Get a specific event
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Event>('getEventById'))
      );
  }

  // Register for an event
  registerForEvent(eventId: number): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.post(`${this.apiUrl}/${eventId}/register`, {}, options)
      .pipe(
        catchError(this.handleError<any>('registerForEvent'))
      );
  }

  // Unregister from an event
  unregisterFromEvent(eventId: number): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.delete(`${this.apiUrl}/${eventId}/register`, options)
      .pipe(
        catchError(this.handleError<any>('unregisterFromEvent'))
      );
  }

  // Get user's registered events
  getUserEvents(): Observable<Event[]> {
    const options = { headers: this.getHeaders() };
    return this.http.get<Event[]>(`${this.apiUrl}/user`, options)
      .pipe(
        catchError(this.handleError<Event[]>('getUserEvents', []))
      );
  }

  // Get upcoming events count (for stats)
  getUpcomingEventsCount(): Observable<number> {
    // For now, mock data - in real app would call API
    return of(5);
  }

  // Get featured events for homepage
  getFeaturedEvents(): Observable<Event[]> {
    // For now, mock data - in real app would call API
    const events: Event[] = [
      {
        id: 1,
        title: 'City Bike Tour',
        description: 'Explore the city landmarks on a guided bike tour.',
        date: new Date('2025-05-15T10:00:00'),
        location: 'Downtown',
        imageUrl: '/assets/images/city-tour.jpg',
        maxParticipants: 20,
        currentParticipants: 12
      },
      {
        id: 2,
        title: 'Mountain Biking Adventure',
        description: 'Challenge yourself with thrilling mountain trails.',
        date: new Date('2025-05-22T09:00:00'),
        location: 'Mountain Range Park',
        imageUrl: '/assets/images/mountain-adventure.jpg',
        maxParticipants: 15,
        currentParticipants: 8
      }
    ];
    return of(events);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
