import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlPanelContainerComponent } from './ctrl-panel-container.component';

describe('CtrlPanelContainerComponent', () => {
  let component: CtrlPanelContainerComponent;
  let fixture: ComponentFixture<CtrlPanelContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrlPanelContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrlPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
