import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestScreenComponent } from './guest-screen.component';

describe('GuestScreenComponent', () => {
  let component: GuestScreenComponent;
  let fixture: ComponentFixture<GuestScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
