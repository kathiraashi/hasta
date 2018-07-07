import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsHrmsComponent } from './permissions-hrms.component';

describe('PermissionsHrmsComponent', () => {
  let component: PermissionsHrmsComponent;
  let fixture: ComponentFixture<PermissionsHrmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsHrmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsHrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
