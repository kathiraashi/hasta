import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelContactinfoCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-contactinfo-companysettings/model-contactinfo-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-contact-info-company-settings',
  templateUrl: './contact-info-company-settings.component.html',
  styleUrls: ['./contact-info-company-settings.component.css']
})
export class ContactInfoCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  CreateContactInfo() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelContactinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewContactInfo() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelContactinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteContactInfo() {
    const initialState = {
      Text: 'Contact Info'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm min-width-350' }));
  }


}
