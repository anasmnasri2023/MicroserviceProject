import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-listprogram',
  standalone: true,
  templateUrl: './listprogram.component.html',
  styleUrls: ['./listprogram.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ListprogramComponent implements OnInit {
  programs: any[] = [
    { id: 1, name: 'Summer Program', description: 'Summer cycling program', date: new Date('2024-06-01') },
    { id: 2, name: 'Winter Program', description: 'Winter cycling program', date: new Date('2024-12-01') }
  ];


  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToDetails(id: number): void {
    this.router.navigate(['/association/detail', id]);
  }

  deleteProgram(id: number) {
    console.log('Deleting program with id:', id);
    this.programs = this.programs.filter(p => p.id !== id);
  }
}
