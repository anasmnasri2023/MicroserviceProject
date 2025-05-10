import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAssociationComponent } from './detail-association.component';

describe('DetailAssociationComponent', () => {
  let component: DetailAssociationComponent;
  let fixture: ComponentFixture<DetailAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
