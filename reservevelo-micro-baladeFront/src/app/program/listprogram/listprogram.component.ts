import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {Balade, BaladeserviceService} from '../../services/baladeservice.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ProgrammeService , Programme} from '../../services/programme.service';

@Component({
  selector: 'app-listprogram',
  standalone: true,
  templateUrl: './listprogram.component.html',
  styleUrls: ['./listprogram.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ListprogramComponent implements OnInit {
  programs: Programme[] = [];


  constructor(
    private progService: ProgrammeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProgramme();
  }


  loadProgramme(): void {
    this.progService.getAllProgramme().subscribe({
      next: (data) => {
        this.programs = data;
      },
      error: (err) => console.error('Erreur chargement des balades', err)
    });
  }

  deleteProgram(id: number | undefined): any {
    this.progService.deleteProgramme(id).subscribe(() => {
      this.loadProgramme(); // refresh après suppression
    });
  }

  goToDetails(id: number | undefined): void {
    this.router.navigate(['/program/detail', id]);
  }

  /*programs: any[] = [
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
  }*/
}
