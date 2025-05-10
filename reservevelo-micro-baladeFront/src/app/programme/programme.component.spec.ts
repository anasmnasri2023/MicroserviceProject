import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeComponent } from './programme.component';

describe('ProgrammeComponent', () => {
  let component: ProgrammeComponent;
  let fixture: ComponentFixture<ProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgrammeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
