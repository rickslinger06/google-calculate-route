import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceCalculationComponent } from './distance-calculation.component';

describe('DistanceCalculationComponent', () => {
  let component: DistanceCalculationComponent;
  let fixture: ComponentFixture<DistanceCalculationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistanceCalculationComponent]
    });
    fixture = TestBed.createComponent(DistanceCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
