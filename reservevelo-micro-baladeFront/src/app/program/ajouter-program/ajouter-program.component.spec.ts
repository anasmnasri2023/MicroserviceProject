import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterProgramComponent } from './ajouter-program.component';

describe('AjouterProgramComponent', () => {
  let component: AjouterProgramComponent;
  let fixture: ComponentFixture<AjouterProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
