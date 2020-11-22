import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucssesModalComponent } from './sucsses-modal.component';

describe('SucssesModalComponent', () => {
  let component: SucssesModalComponent;
  let fixture: ComponentFixture<SucssesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucssesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucssesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
