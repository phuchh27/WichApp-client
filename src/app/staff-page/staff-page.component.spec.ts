import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPageComponent } from './staff-page.component';

describe('StaffPageComponent', () => {
  let component: StaffPageComponent;
  let fixture: ComponentFixture<StaffPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffPageComponent]
    });
    fixture = TestBed.createComponent(StaffPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
