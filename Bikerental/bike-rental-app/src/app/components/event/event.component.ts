// src/app/components/event/event.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents().subscribe(
      events => {
        this.events = events;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Failed to load events. Please try again later.';
        this.loading = false;
      }
    );
  }

  registerForEvent(eventId: number): void {
    this.eventService.registerForEvent(eventId).subscribe(
      response => {
        // Refresh events list after registering
        this.loadEvents();
      },
      error => {
        this.errorMessage = 'Failed to register for event. Please try again later.';
      }
    );
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
