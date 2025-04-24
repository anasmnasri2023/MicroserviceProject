import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventComponent } from './list-event.component';

describe('ListEventComponent', () => {
  let component: ListEventComponent;
  let fixture: ComponentFixture<ListEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEventComponent]
    });
    fixture = TestBed.createComponent(ListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
