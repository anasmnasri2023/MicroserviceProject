import { Component, OnInit } from '@angular/core';
import { BaladeserviceService, Balade } from '../../services/baladeservice.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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

  exportPdf(): void {
    this.baladeService.exportBaladesPdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'balades.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  exportExcel(): void {
    this.baladeService.exportBaladesExcel().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'balades.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  
}
