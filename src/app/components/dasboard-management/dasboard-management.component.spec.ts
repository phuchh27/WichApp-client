import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardManagementComponent } from './dasboard-management.component';

describe('DasboardManagementComponent', () => {
  let component: DasboardManagementComponent;
  let fixture: ComponentFixture<DasboardManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DasboardManagementComponent]
    });
    fixture = TestBed.createComponent(DasboardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
