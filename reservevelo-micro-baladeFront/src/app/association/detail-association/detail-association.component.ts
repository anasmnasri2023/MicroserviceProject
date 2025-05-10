import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DatePipe, Location, NgIf} from '@angular/common';
import {AssociationsService, Association} from '../../services/associations.service';

@Component({
  selector: 'app-detail-association',
  templateUrl: './detail-association.component.html',
  imports: [
    DatePipe,
    NgIf
  ],
  styleUrls: ['./detail-association.component.css']
})
export class DetailAssociationComponent implements OnInit {


  association:Association | undefined;

  constructor(
    private assService: AssociationsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.assService.getAssociationById(id).subscribe((data) => {
      this.association = data;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
