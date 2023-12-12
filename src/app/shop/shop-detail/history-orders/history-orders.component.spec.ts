import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOrdersComponent } from './history-orders.component';

describe('HistoryOrdersComponent', () => {
  let component: HistoryOrdersComponent;
  let fixture: ComponentFixture<HistoryOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryOrdersComponent]
    });
    fixture = TestBed.createComponent(HistoryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
