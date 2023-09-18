import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffListComponent } from './staff-list.component';

describe('StaffListComponent', () => {
  let component: StaffListComponent;
  let fixture: ComponentFixture<StaffListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffListComponent]
    });
    fixture = TestBed.createComponent(StaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
