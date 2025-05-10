import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBaladeComponent } from './ajouter-balade.component';

describe('AjouterBaladeComponent', () => {
  let component: AjouterBaladeComponent;
  let fixture: ComponentFixture<AjouterBaladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterBaladeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterBaladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
