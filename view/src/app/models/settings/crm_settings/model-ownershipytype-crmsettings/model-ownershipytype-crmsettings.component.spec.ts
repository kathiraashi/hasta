import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOwnershipytypeCrmsettingsComponent } from './model-ownershipytype-crmsettings.component';

describe('ModelOwnershipytypeCrmsettingsComponent', () => {
  let component: ModelOwnershipytypeCrmsettingsComponent;
  let fixture: ComponentFixture<ModelOwnershipytypeCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelOwnershipytypeCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOwnershipytypeCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
