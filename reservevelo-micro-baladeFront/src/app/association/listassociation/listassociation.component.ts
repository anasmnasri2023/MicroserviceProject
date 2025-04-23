import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {AssociationsService, Association , Notification} from '../../services/associations.service';


@Component({
  selector: 'app-listassociation',
  standalone: true,
  templateUrl: './listassociation.component.html',
  styleUrls: ['./listassociation.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ListassociationComponent implements OnInit {

  associations: Association[] = [];
  notifications: Notification[] = [];




  constructor(
    private assService: AssociationsService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadassociation();
    this.loadNotifications();
    setInterval(() => this.loadNotifications(), 30000);
  }


  loadNotifications() {
    this.assService.getUnread().subscribe(n => {
      this.notifications = n;
    });
  }

  markAsRead(id: number) {
    this.assService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.id !== id);
    });
  }


  loadassociation(): void {
    this.assService.getAllAssociations().subscribe({
      next: (data) => {
        this.associations = data;
      },
      error: (err) => console.error('Erreur chargement des association', err)
    });
  }

  deleteAssociation(id: number | undefined): any {
    this.assService.deleteAssociation(id).subscribe(() => {
      this.loadassociation(); // refresh après suppression
    });
  }

  /* associations: any[] = [
     { id: 1, name: 'Cycling Club', description: 'A club for cycling enthusiasts' },
     { id: 2, name: 'Mountain Bikers', description: 'Group for mountain biking adventures' }
   ];

   constructor(private router: Router) {}



   ngOnInit(): void {}
 */
  goToDetails(id: number | undefined): void {
    this.router.navigate(['/association/detail', id]);
  }
 /* deleteAssociation(id: number) {
    console.log('Deleting association with id:', id);
    this.associations = this.associations.filter(a => a.id !== id);
  }*/
}
