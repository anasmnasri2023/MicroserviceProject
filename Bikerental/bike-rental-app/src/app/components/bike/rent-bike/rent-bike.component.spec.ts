import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBikeComponent } from './rent-bike.component';

describe('RentBikeComponent', () => {
  let component: RentBikeComponent;
  let fixture: ComponentFixture<RentBikeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentBikeComponent]
    });
    fixture = TestBed.createComponent(RentBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
