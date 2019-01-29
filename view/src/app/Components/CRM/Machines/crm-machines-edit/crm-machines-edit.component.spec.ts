import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmMachinesEditComponent } from './crm-machines-edit.component';

describe('CrmMachinesEditComponent', () => {
  let component: CrmMachinesEditComponent;
  let fixture: ComponentFixture<CrmMachinesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmMachinesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmMachinesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
