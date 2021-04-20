import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucssesFormComponent } from './sucsses-form.component';

describe('ModalFormComponent', () => {
  let component: SucssesFormComponent;
  let fixture: ComponentFixture<SucssesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucssesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucssesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
