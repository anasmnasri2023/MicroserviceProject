import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAssociationComponent } from './ajouter-association.component';

describe('AjouterAssociationComponent', () => {
  let component: AjouterAssociationComponent;
  let fixture: ComponentFixture<AjouterAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
