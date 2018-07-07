import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelActivitypriorityCrmsettingsComponent } from './model-activitypriority-crmsettings.component';

describe('ModelActivitypriorityCrmsettingsComponent', () => {
  let component: ModelActivitypriorityCrmsettingsComponent;
  let fixture: ComponentFixture<ModelActivitypriorityCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelActivitypriorityCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelActivitypriorityCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
