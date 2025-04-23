import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgrammeService , Programme } from '../../services/programme.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-ajouter-program',
  templateUrl: './ajouter-program.component.html',
  styleUrls: ['./ajouter-program.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AjouterProgramComponent implements OnInit {
  program: Programme = {
    startingPoint: '',
    departureTime: '',
    remarks: ''
  };

  constructor(private progService:ProgrammeService , private router: Router) { }

  ngOnInit(): void { }



  saveProgram() {
    console.log('Saving association:', this.program);
    this.progService.addProgramme(this.program).subscribe({
      next: () => {
        alert('✅ Association ajoutée avec succès');
        this.router.navigate(['/association']); // à adapter selon ta route
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de l\'association', err);
        if (err.status === 0) {
          alert('❌ Erreur de connexion au serveur. Veuillez vérifier votre connexion réseau.');
        } else if (err.status >= 400 && err.status < 500) {
          alert('❌ Erreur de validation des données. Veuillez vérifier les informations saisies.');
        } else if (err.status >= 500) {
          alert('❌ Erreur serveur. Veuillez réessayer plus tard.');
        } else {
          alert('❌ Une erreur inconnue est survenue.');
        }
      }
    });
  }
}
