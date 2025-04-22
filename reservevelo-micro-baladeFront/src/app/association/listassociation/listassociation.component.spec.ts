import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListassociationComponent } from './listassociation.component';

describe('ListassociationComponent', () => {
  let component: ListassociationComponent;
  let fixture: ComponentFixture<ListassociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListassociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListassociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
