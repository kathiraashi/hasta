import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmMachinesViewComponent } from './crm-machines-view.component';

describe('CrmMachinesViewComponent', () => {
  let component: CrmMachinesViewComponent;
  let fixture: ComponentFixture<CrmMachinesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmMachinesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmMachinesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
