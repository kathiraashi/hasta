import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelEmployeecategoryHrsettingsComponent } from '../../../../../models/settings/hr_settings/model-employeecategory-hrsettings/model-employeecategory-hrsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-employee-category-hr-settings',
  templateUrl: './employee-category-hr-settings.component.html',
  styleUrls: ['./employee-category-hr-settings.component.css']
})
export class EmployeeCategoryHrSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  ngOnInit() {
  }
  CreateEmployeeCategory() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelEmployeecategoryHrsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewEmployeeCategory() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelEmployeecategoryHrsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteEmployeeCategory() {
    const initialState = {
      Text: 'Employee Category'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
