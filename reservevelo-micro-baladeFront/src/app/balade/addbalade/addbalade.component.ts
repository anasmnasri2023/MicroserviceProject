import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaladeserviceService, Balade } from '../../services/baladeservice.service';

@Component({
  standalone: false,
  selector: 'app-addbalade',
  templateUrl: './addbalade.component.html',
  styleUrls: ['./addbalade.component.css']
})
export class AddbaladeComponent {
  balade: Balade = {
    title: '',
    description: '',
    location: '',
    date: new Date(),
    duration: 0,
    programmeBalade: 0 // à changer si programmeBalade est un objet
  };

  programmeId: string = ''; // ce champ permet d’envoyer l’ID du programmeBalade

  constructor(private baladeService: BaladeserviceService, private router: Router) {}

  saveBalade() {
    this.baladeService.addBalade(this.balade, this.programmeId).subscribe(() => {
      alert('✅ Balade ajoutée avec succès');
      this.router.navigate(['/listbalade']); // à adapter selon ta route
    });
  }
}
