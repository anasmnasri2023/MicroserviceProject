// src/app/services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Event {
  idEvent: number;
  title: string;
  description: string;
  location: string;
  start_date: Date;
  end_date: Date;
  picture: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8093/event';
  private imagePath = 'assets/images/';

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
    return this.http.get<Event[]>(`${this.apiUrl}/display`)
      .pipe(
        map(events => this.processEventsImages(events)),
        catchError(this.handleError<Event[]>('getAllEvents', []))
      );
  }

  // Get a specific event
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/retrive/${id}`)
      .pipe(
        map(event => this.processEventImage(event)),
        catchError(this.handleError<Event>('getEventById'))
      );
  }

  // Add a new event
  addEvent(event: Event): Observable<Event> {
    // Strip the path from the image name if it's a full path
    const eventToSave = this.prepareEventForSaving(event);

    const options = { headers: this.getHeaders() };
    return this.http.post<Event>(`${this.apiUrl}/add`, eventToSave, options)
      .pipe(
        map(event => this.processEventImage(event)),
        catchError(this.handleError<Event>('addEvent'))
      );
  }

  // Update an event
  updateEvent(event: Event): Observable<Event> {
    // Strip the path from the image name if it's a full path
    const eventToSave = this.prepareEventForSaving(event);

    const options = { headers: this.getHeaders() };
    return this.http.put<Event>(`${this.apiUrl}/update`, eventToSave, options)
      .pipe(
        map(event => this.processEventImage(event)),
        catchError(this.handleError<Event>('updateEvent'))
      );
  }

  // Delete an event
  deleteEvent(eventId: number): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.delete(`${this.apiUrl}/delete/${eventId}`, options)
      .pipe(
        catchError(this.handleError<any>('deleteEvent'))
      );
  }

  // Get upcoming events count for stats
  getUpcomingEventsCount(): Observable<number> {
    // Since there's no direct API for this, we'll fetch all events and count those with future dates
    return of(5); // Mock response for now
  }

  // Format dates for display
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Process event images for display
  processEventImage(event: Event): Event {
    if (!event) return event;

    // Create a copy of the event to avoid modifying the original
    const processedEvent = { ...event };

    // If the picture doesn't already have a path and isn't null/empty
    if (processedEvent.picture && !processedEvent.picture.includes('/')) {
      processedEvent.picture = this.imagePath + processedEvent.picture;
    }

    // Ensure picture is never undefined
    if (!processedEvent.picture) {
      processedEvent.picture = '';
    }

    return processedEvent;
  }

  // Process multiple events' images
  processEventsImages(events: Event[]): Event[] {
    if (!events) return [];
    return events.map(event => this.processEventImage(event));
  }

  // Prepare event for saving to backend
  prepareEventForSaving(event: Event): Event {
    const eventCopy = {...event};

    // If the picture contains a path, extract just the filename
    if (eventCopy.picture && eventCopy.picture.includes('/')) {
      const filename = eventCopy.picture.split('/').pop();
      eventCopy.picture = filename || ''; // Ensure it's never undefined
    }

    // Ensure picture is never undefined
    if (!eventCopy.picture) {
      eventCopy.picture = '';
    }

    return eventCopy;
  }

  // Get just the filename from a full image path
  getImageFilename(imagePath: string | undefined): string {
    if (!imagePath) return '';

    if (imagePath.includes('/')) {
      return imagePath.split('/').pop() || '';
    }
    return imagePath;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
