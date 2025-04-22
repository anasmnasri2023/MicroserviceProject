import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-association',
  templateUrl: './detail-association.component.html',
  styleUrls: ['./detail-association.component.css']
})
export class DetailAssociationComponent implements OnInit {
  association: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // TODO: Implement your association service call here
    this.association = {
      id: 1,
      name: 'Sample Association',
      description: 'Sample Description'
    };
  }
}
