import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelActivitystatusCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-activitystatus-crmsettings/model-activitystatus-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-activity-status-type-crm-settings',
  templateUrl: './activity-status-type-crm-settings.component.html',
  styleUrls: ['./activity-status-type-crm-settings.component.css']
})
export class ActivityStatusTypeCrmSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateActivitystatus() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelActivitystatusCrmsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewActivitystatus() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelActivitystatusCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteActivityStatus() {
    const initialState = {
      Text: 'Activity Status'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
