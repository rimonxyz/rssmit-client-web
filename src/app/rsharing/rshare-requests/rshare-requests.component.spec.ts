import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RshareRequestsComponent } from './rshare-requests.component';

describe('RshareRequestsComponent', () => {
  let component: RshareRequestsComponent;
  let fixture: ComponentFixture<RshareRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RshareRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RshareRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
