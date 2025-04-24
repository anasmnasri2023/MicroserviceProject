import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VelorentListComponent } from './velorent-list.component';

describe('VelorentListComponent', () => {
  let component: VelorentListComponent;
  let fixture: ComponentFixture<VelorentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VelorentListComponent]
    });
    fixture = TestBed.createComponent(VelorentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
