import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationComponent } from './association.component';
import { ListassociationComponent } from './listassociation/listassociation.component';
import { AjouterAssociationComponent } from './ajouter-association/ajouter-association.component';
import { DetailAssociationComponent } from './detail-association/detail-association.component';


const routes: Routes = [{ path: '', component: AssociationComponent },
  { path: 'liste', component: ListassociationComponent },
  { path: 'add', component: AjouterAssociationComponent },
  { path: 'detail', component: DetailAssociationComponent },
  { path: 'detail/:id', component: DetailAssociationComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationRoutingModule { }
