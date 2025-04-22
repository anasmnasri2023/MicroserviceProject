import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociationComponent } from './association.component';
import { AssociationRoutingModule } from './association-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListassociationComponent } from './listassociation/listassociation.component';

@NgModule({
  declarations: [
    AssociationComponent
  ],
  imports: [
    CommonModule,
    AssociationRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    ListassociationComponent
  ]
})
export class AssociationModule { }
import { DetailAssociationComponent } from './detail-association/detail-association.component';
