import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesCrmCustomersViewComponent } from './machines-crm-customers-view.component';

describe('MachinesCrmCustomersViewComponent', () => {
  let component: MachinesCrmCustomersViewComponent;
  let fixture: ComponentFixture<MachinesCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinesCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
