import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbaladeComponent } from './listbalade.component';

describe('ListbaladeComponent', () => {
  let component: ListbaladeComponent;
  let fixture: ComponentFixture<ListbaladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListbaladeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListbaladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
