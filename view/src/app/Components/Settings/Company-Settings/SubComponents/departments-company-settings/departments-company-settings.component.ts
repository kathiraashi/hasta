import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelDepartmentsCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-departments-companysettings/model-departments-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-departments-company-settings',
  templateUrl: './departments-company-settings.component.html',
  styleUrls: ['./departments-company-settings.component.css']
})
export class DepartmentsCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  ngOnInit() {
  }

  CreateDepartmentInfo() {
      const initialState = {
        Type: 'Create'
      };
    this.bsModalRef = this.modalService.show(ModelDepartmentsCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }

  ViewDepartmentInfo() {
    const initialState = {
      Type: 'View'
    };
   this.bsModalRef = this.modalService.show(ModelDepartmentsCompanysettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteDepartmentInfo() {
    const initialState = {
      Text: 'Department Company Settings'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
