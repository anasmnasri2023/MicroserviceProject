// src/app/components/bike/bike.component.ts
import { Component, OnInit } from '@angular/core';
import { BikeService, Bike } from '../../services/bike.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {
  bikes: Bike[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private bikeService: BikeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBikes();
  }

  loadBikes(): void {
    this.loading = true;
    this.bikeService.getAllBikes().subscribe(
      bikes => {
        this.bikes = bikes;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Failed to load bikes. Please try again later.';
        this.loading = false;
      }
    );
  }

  rentBike(bikeId: number): void {
    this.router.navigate(['/rent-bike', bikeId]);
  }
}
