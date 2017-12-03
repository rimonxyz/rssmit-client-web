import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRshareComponent } from './rshare.component';

describe('CreateRshareComponent', () => {
  let component: CreateRshareComponent;
  let fixture: ComponentFixture<CreateRshareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRshareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
