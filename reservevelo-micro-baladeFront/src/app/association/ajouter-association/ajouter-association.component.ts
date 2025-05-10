import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AssociationsService , Association } from '../../services/associations.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-ajouter-association',
  templateUrl: './ajouter-association.component.html',
  styleUrls: ['./ajouter-association.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AjouterAssociationComponent {
  association: Association = {
    name: '',
    adresse: '',
    phone: 0,
    description: '',
    email: '',
  };

  constructor(private assService: AssociationsService, private router: Router) {}

  ngOnInit(): void {}

  saveAssociation() {
    console.log('Saving association:', this.association);
    this.assService.addAssociation(this.association).subscribe({
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
