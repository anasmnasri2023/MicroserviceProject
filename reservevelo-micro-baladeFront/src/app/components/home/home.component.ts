import { Component, OnInit } from '@angular/core';
import { BaladeserviceService, Balade } from '../../services/baladeservice.service';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalBalades: number = 0;
  activeBalades: number = 0;
  completedBalades: number = 0;

  constructor(private baladeService: BaladeserviceService) {}

  ngOnInit(): void {
    this.loadBaladeStats();
  }

  loadBaladeStats(): void {
    this.baladeService.getAllBalades().subscribe((balades: Balade[]) => {
      this.totalBalades = balades.length;

      const now = new Date();

      this.activeBalades = balades.filter(balade => new Date(balade.date) > now).length;
      this.completedBalades = balades.filter(balade => new Date(balade.date) <= now).length;
    });
  }

}
