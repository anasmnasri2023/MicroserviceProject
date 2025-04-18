import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBaladeComponent } from './detail-balade.component';

describe('DetailBaladeComponent', () => {
  let component: DetailBaladeComponent;
  let fixture: ComponentFixture<DetailBaladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailBaladeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBaladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
