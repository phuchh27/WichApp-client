import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkScheduleComponent } from './work-schedule.component';

describe('WorkScheduleComponent', () => {
  let component: WorkScheduleComponent;
  let fixture: ComponentFixture<WorkScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkScheduleComponent]
    });
    fixture = TestBed.createComponent(WorkScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
