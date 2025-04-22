import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './program.component';
import { ProgramRoutingModule } from './program-routing.module';
import { AjouterProgramComponent } from './ajouter-program/ajouter-program.component';
import { DetailProgramComponent } from './detail-program/detail-program.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProgramComponent,
    DetailProgramComponent
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    AjouterProgramComponent
  ]
})
export class ProgramModule { }
