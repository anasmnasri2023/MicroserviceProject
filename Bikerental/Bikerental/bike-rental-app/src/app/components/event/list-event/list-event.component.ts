// src/app/components/event/list-event/list-event.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService, Event as EventModel } from '../../../services/event.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-list-event',
    templateUrl: './list-event.component.html',
    styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {
    events: EventModel[] = [];
    filteredEvents: EventModel[] = [];
    loading: boolean = true;
    errorMessage: string = '';

    // For search functionality
    searchTerm: string = '';
    searchTerms = new Subject<string>();

    // For the event form
    showEventForm: boolean = false;
    currentEvent: EventModel = this.resetEventForm();
    isEditMode: boolean = false;
    imageFilename: string = '';

    constructor(
        private eventService: EventService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadEvents();

        // Set up search with debounce time to prevent searching on every keystroke
        this.searchTerms.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            distinctUntilChanged() // Only search if the term changed
        ).subscribe(term => {
            this.searchTerm = term;
            this.filterEvents();
        });
    }

    loadEvents(): void {
        this.loading = true;
        this.eventService.getAllEvents().subscribe(
            events => {
                this.events = events;
                this.filteredEvents = [...events]; // Initialize filtered events with all events
                this.loading = false;
            },
            error => {
                this.errorMessage = 'Failed to load events. Please try again later.';
                this.loading = false;
            }
        );
    }

    // Method to update search term as user types - fixed to use DOM Event type
    search(inputEvent: Event): void {
        // Explicitly type to HTMLInputElement
        const target = inputEvent.target as HTMLInputElement;
        const inputValue = target.value;
        this.searchTerms.next(inputValue);
    }

    // Filter events based on search term
    filterEvents(): void {
        if (!this.searchTerm.trim()) {
            this.filteredEvents = [...this.events];
            return;
        }

        const searchTermLower = this.searchTerm.toLowerCase();

        this.filteredEvents = this.events.filter(event =>
            event.title.toLowerCase().includes(searchTermLower) ||
            event.description.toLowerCase().includes(searchTermLower) ||
            event.location.toLowerCase().includes(searchTermLower)
        );
    }

    openAddEventForm(): void {
        this.isEditMode = false;
        this.currentEvent = this.resetEventForm();
        this.imageFilename = '';
        this.showEventForm = true;
    }

    openEditEventForm(event: EventModel): void {
        this.isEditMode = true;
        this.currentEvent = {...event};
        // Extract just the filename from the picture path
        this.imageFilename = this.eventService.getImageFilename(event.picture);
        this.showEventForm = true;
    }

    closeEventForm(): void {
        this.showEventForm = false;
    }

    resetEventForm(): EventModel {
        return {
            idEvent: 0,
            title: '',
            description: '',
            location: '',
            start_date: new Date(),
            end_date: new Date(),
            picture: ''
        };
    }

    saveEvent(): void {
        // Set the picture from imageFilename
        this.currentEvent.picture = this.imageFilename;

        if (this.isEditMode) {
            this.eventService.updateEvent(this.currentEvent).subscribe(
                updatedEvent => {
                    this.loadEvents();
                    this.closeEventForm();
                },
                error => {
                    this.errorMessage = 'Failed to update event. Please try again.';
                }
            );
        } else {
            this.eventService.addEvent(this.currentEvent).subscribe(
                newEvent => {
                    this.loadEvents();
                    this.closeEventForm();
                },
                error => {
                    this.errorMessage = 'Failed to add event. Please try again.';
                }
            );
        }
    }

    deleteEvent(eventId: number): void {
        if (confirm('Are you sure you want to delete this event?')) {
            this.eventService.deleteEvent(eventId).subscribe(
                () => {
                    this.loadEvents();
                },
                error => {
                    this.errorMessage = 'Failed to delete event. Please try again.';
                }
            );
        }
    }

    formatDate(date: Date): string {
        return this.eventService.formatDate(date);
    }
}
