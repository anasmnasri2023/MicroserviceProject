import { Component, OnInit } from '@angular/core';
import { BaladeserviceService, Balade } from '../../services/baladeservice.service';

@Component({
  standalone: false,
  selector: 'app-listbalade',
  templateUrl: './listbalade.component.html',
  styleUrls: ['./listbalade.component.css']
})
export class ListbaladeComponent implements OnInit {
  balades: Balade[] = [];

  constructor(private baladeService: BaladeserviceService) {}

  ngOnInit(): void {
    this.loadBalades();
  }

  loadBalades(): void {
    this.baladeService.getAllBalades().subscribe({
      next: (data) => this.balades = data,
      error: (err) => console.error('Erreur chargement des balades', err)
    });
  }

  deleteBalade(id: string): void {
    this.baladeService.deleteBalade(id).subscribe(() => {
      this.loadBalades(); // refresh après suppression
    });
  }
}












