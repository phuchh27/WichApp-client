import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerHomeComponent } from './owner-home.component';

describe('OwnerHomeComponent', () => {
  let component: OwnerHomeComponent;
  let fixture: ComponentFixture<OwnerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerHomeComponent]
    });
    fixture = TestBed.createComponent(OwnerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
