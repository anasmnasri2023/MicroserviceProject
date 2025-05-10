import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Programme, ProgrammeService } from '../../services/programme.service';

@Component({
  selector: 'app-detail-program',
  standalone: false,
  templateUrl: './detail-program.component.html',
  styleUrl: './detail-program.component.css'
})
export class DetailProgramComponent {
  program: Programme | undefined;
  loading: boolean = false;

  constructor(
    private progService: ProgrammeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = String(this.route.snapshot.paramMap.get('id'));

    // Fetch program with weather data
    this.progService.getProgramWithWeather(id).subscribe({
      next: (data) => {
        this.program = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching program with weather:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
