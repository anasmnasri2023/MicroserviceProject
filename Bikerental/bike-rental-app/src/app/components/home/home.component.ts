// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  availableBikes: number = 0;
  activeRentals: number = 0;
  upcomingEvents: number = 0;
  featuredBikes: any[] = [];

  constructor(
    private bikeService: BikeService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadFeaturedBikes();
  }

  loadStats(): void {
    // In a real application, these would be API calls
    this.bikeService.getAvailableBikesCount().subscribe(count => {
      this.availableBikes = count;
    });

    this.bikeService.getActiveRentalsCount().subscribe(count => {
      this.activeRentals = count;
    });

    this.eventService.getUpcomingEventsCount().subscribe(count => {
      this.upcomingEvents = count;
    });
  }

  loadFeaturedBikes(): void {
    this.bikeService.getFeaturedBikes().subscribe(bikes => {
      this.featuredBikes = bikes;
    });
  }

  rentBike(bikeId: number): void {
    this.router.navigate(['/rent-bike', bikeId]);
  }
}
