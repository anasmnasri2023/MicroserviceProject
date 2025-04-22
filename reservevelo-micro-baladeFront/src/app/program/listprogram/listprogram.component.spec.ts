import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprogramComponent } from './listprogram.component';

describe('ListprogramComponent', () => {
  let component: ListprogramComponent;
  let fixture: ComponentFixture<ListprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListprogramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
