import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgrammeRoutingModule } from './programme-routing.module';
import { ProgrammeComponent } from './programme.component';
import { ComponentOneComponent } from './component-one/component-one.component';
import { AjouterBaladeComponent } from './ajouter-programme/ajouter-balade.component';
import { DetailBaladeComponent } from './detail-balade/detail-balade.component';
import { ListbaladeComponent } from './listbalade/listbalade.component';


@NgModule({
  declarations: [
    ProgrammeComponent,
    ComponentOneComponent,
    AjouterBaladeComponent,
    DetailBaladeComponent,
    ListbaladeComponent
  ],
  imports: [
    CommonModule,
    ProgrammeRoutingModule
  ]
})
export class ProgrammeModule { }
