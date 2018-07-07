import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmMachinesListComponent } from './crm-machines-list.component';

describe('CrmMachinesListComponent', () => {
  let component: CrmMachinesListComponent;
  let fixture: ComponentFixture<CrmMachinesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmMachinesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmMachinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
