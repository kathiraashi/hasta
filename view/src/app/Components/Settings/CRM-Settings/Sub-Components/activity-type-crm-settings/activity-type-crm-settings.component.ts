import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelActivitytypeCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-activitytype-crmsettings/model-activitytype-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-activity-type-crm-settings',
  templateUrl: './activity-type-crm-settings.component.html',
  styleUrls: ['./activity-type-crm-settings.component.css']
})
export class ActivityTypeCrmSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  ngOnInit() {
  }
  CreateActivitytype() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelActivitytypeCrmsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewActivitytype() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelActivitytypeCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteActivityType() {
    const initialState = {
      Text: 'Activity Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
