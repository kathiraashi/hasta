import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionsGroupCreateComponent } from './user-permissions-group-create.component';

describe('UserPermissionsGroupCreateComponent', () => {
  let component: UserPermissionsGroupCreateComponent;
  let fixture: ComponentFixture<UserPermissionsGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPermissionsGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionsGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
