import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaladeserviceService, Balade } from '../../services/baladeservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-balade',
  standalone: false,
  templateUrl: './detail-balade.component.html',
  styleUrls: ['./detail-balade.component.css']
})
export class DetailBaladeComponent implements OnInit {

  balade: Balade | undefined;

  constructor(
    private baladeService: BaladeserviceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.baladeService.getBaladeById(id).subscribe((data) => {
      this.balade = data;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
