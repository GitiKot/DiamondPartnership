import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriousnessComponent } from './seriousness.component';

describe('SeriousnessComponent', () => {
  let component: SeriousnessComponent;
  let fixture: ComponentFixture<SeriousnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriousnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriousnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
