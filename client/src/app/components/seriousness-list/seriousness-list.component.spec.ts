import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriousnessListComponent } from './seriousness-list.component';

describe('SeriousnessListComponent', () => {
  let component: SeriousnessListComponent;
  let fixture: ComponentFixture<SeriousnessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriousnessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriousnessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
