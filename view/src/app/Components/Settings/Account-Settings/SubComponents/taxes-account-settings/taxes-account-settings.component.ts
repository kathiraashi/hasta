import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelTaxesAccountsettingsComponent } from '../../../../../models/settings/account_settings/model-taxes-accountsettings/model-taxes-accountsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-taxes-account-settings',
  templateUrl: './taxes-account-settings.component.html',
  styleUrls: ['./taxes-account-settings.component.css']
})
export class TaxesAccountSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateTaxes() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelTaxesAccountsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewTaxes() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelTaxesAccountsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteTaxes() {
    const initialState = {
      Text: 'Taxes Account Settings'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
