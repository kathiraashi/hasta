import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelLeavetypeHrmssettingsComponent } from '../../../../../models/settings/hrms_settings/model-leavetype-hrmssettings/model-leavetype-hrmssettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-leave-type-hrms-settings',
  templateUrl: './leave-type-hrms-settings.component.html',
  styleUrls: ['./leave-type-hrms-settings.component.css']
})
export class LeaveTypeHrmsSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateLeaveType() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelLeavetypeHrmssettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewLeaveType() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelLeavetypeHrmssettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteLeaveType() {
    const initialState = {
      Text: 'Leave Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
