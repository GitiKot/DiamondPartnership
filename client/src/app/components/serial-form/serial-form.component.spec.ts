import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialFormComponent } from './serial-form.component';

describe('SerialFormComponent', () => {
  let component: SerialFormComponent;
  let fixture: ComponentFixture<SerialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
