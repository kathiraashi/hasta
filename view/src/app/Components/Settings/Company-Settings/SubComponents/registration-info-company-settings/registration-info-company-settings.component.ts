import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelRegistrationinfoCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-registrationinfo-companysettings/model-registrationinfo-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-registration-info-company-settings',
  templateUrl: './registration-info-company-settings.component.html',
  styleUrls: ['./registration-info-company-settings.component.css']
})
export class RegistrationInfoCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateRegistrationInfo() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelRegistrationinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewRegistrationInfo() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelRegistrationinfoCompanysettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteRegistrationInfo() {
    const initialState = {
      Text: 'Registration Info'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
