import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeComponent } from './bike.component';

describe('BikeComponent', () => {
  let component: BikeComponent;
  let fixture: ComponentFixture<BikeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BikeComponent]
    });
    fixture = TestBed.createComponent(BikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
