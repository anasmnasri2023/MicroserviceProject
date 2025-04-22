import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbaladeComponent } from './addbalade.component';

describe('AddbaladeComponent', () => {
  let component: AddbaladeComponent;
  let fixture: ComponentFixture<AddbaladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddbaladeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbaladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
