import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSeriousnessListComponent } from './private-seriousness-list.component';

describe('PrivateSeriousnessListComponent', () => {
  let component: PrivateSeriousnessListComponent;
  let fixture: ComponentFixture<PrivateSeriousnessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateSeriousnessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSeriousnessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
