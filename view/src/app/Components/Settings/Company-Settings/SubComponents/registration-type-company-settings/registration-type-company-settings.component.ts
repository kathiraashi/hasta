import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelRegistrationtypeCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-registrationtype-companysettings/model-registrationtype-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-registration-type-company-settings',
  templateUrl: './registration-type-company-settings.component.html',
  styleUrls: ['./registration-type-company-settings.component.css']
})
export class RegistrationTypeCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }


  ngOnInit() {
  }
  CreateRegistrationType() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelRegistrationtypeCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewRegistrationType() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelRegistrationtypeCompanysettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteRegistrationType() {
    const initialState = {
      Text: 'Registration Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
