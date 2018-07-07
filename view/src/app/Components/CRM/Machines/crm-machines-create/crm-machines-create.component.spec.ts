import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmMachinesCreateComponent } from './crm-machines-create.component';

describe('CrmMachinesCreateComponent', () => {
  let component: CrmMachinesCreateComponent;
  let fixture: ComponentFixture<CrmMachinesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmMachinesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmMachinesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
