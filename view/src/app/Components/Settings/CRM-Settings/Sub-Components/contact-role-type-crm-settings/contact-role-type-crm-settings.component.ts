import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelContactroleCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-contactrole-crmsettings/model-contactrole-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-contact-role-type-crm-settings',
  templateUrl: './contact-role-type-crm-settings.component.html',
  styleUrls: ['./contact-role-type-crm-settings.component.css']
})
export class ContactRoleTypeCrmSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  ngOnInit() {
  }
  CreateContactRole() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelContactroleCrmsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewContactRole() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelContactroleCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteContactRole() {
    const initialState = {
      Text: 'Contact Role'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
