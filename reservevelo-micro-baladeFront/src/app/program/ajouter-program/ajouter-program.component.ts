import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Program {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  associationId: number;
}

@Component({
  selector: 'app-ajouter-program',
  templateUrl: './ajouter-program.component.html',
  styleUrls: ['./ajouter-program.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AjouterProgramComponent implements OnInit {
  program: Program = {
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    associationId: 0
  };

  constructor() { }

  ngOnInit(): void { }

  saveProgram() {
    console.log('Saving program:', this.program);
    // Add your save logic here
  }
}
