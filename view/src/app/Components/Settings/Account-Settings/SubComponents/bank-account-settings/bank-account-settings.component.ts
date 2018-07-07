import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelBankAccountsettingsComponent } from '../../../../../models/settings/account_settings/model-bank-accountsettings/model-bank-accountsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-bank-account-settings',
  templateUrl: './bank-account-settings.component.html',
  styleUrls: ['./bank-account-settings.component.css']
})
export class BankAccountSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  ngOnInit() {
  }
  CreateBank() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelBankAccountsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewBank() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelBankAccountsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteBank() {
    const initialState = {
      Text: 'Bank Account Settings'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
