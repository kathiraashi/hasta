import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMachineIdleComponent } from './model-machine-idle.component';

describe('ModelMachineIdleComponent', () => {
  let component: ModelMachineIdleComponent;
  let fixture: ComponentFixture<ModelMachineIdleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMachineIdleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMachineIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
