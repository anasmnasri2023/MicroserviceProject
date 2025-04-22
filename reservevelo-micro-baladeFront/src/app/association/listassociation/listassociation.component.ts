import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-listassociation',
  standalone: true,
  templateUrl: './listassociation.component.html',
  styleUrls: ['./listassociation.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ListassociationComponent implements OnInit {
  associations: any[] = [
    { id: 1, name: 'Cycling Club', description: 'A club for cycling enthusiasts' },
    { id: 2, name: 'Mountain Bikers', description: 'Group for mountain biking adventures' }
  ];

  constructor(private router: Router) {}



  ngOnInit(): void {}

  goToDetails(id: number): void {
    this.router.navigate(['/association/detail', id]);
  }
  deleteAssociation(id: number) {
    console.log('Deleting association with id:', id);
    this.associations = this.associations.filter(a => a.id !== id);
  }
}
