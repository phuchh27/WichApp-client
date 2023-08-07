import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreComComponent } from './store-com.component';

describe('StoreComComponent', () => {
  let component: StoreComComponent;
  let fixture: ComponentFixture<StoreComComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreComComponent]
    });
    fixture = TestBed.createComponent(StoreComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
