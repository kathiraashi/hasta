import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelDepartmentHrsettingsComponent } from '../../../../../models/settings/hr_settings/model-department-hrsettings/model-department-hrsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-department-hr-settings',
  templateUrl: './department-hr-settings.component.html',
  styleUrls: ['./department-hr-settings.component.css']
})
export class DepartmentHrSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateDepartment() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelDepartmentHrsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewDepartment() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelDepartmentHrsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteDepartment() {
    const initialState = {
      Text: 'Department Hr Settings'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
