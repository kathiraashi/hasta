import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelIncometypeAccountsettingsComponent } from '../../../../../models/settings/account_settings/model-incometype-accountsettings/model-incometype-accountsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-income-type-account-settings',
  templateUrl: './income-type-account-settings.component.html',
  styleUrls: ['./income-type-account-settings.component.css']
})
export class IncomeTypeAccountSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateIncomeType() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelIncometypeAccountsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewIncomeType() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelIncometypeAccountsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteIncomeType() {
    const initialState = {
      Text: 'Income Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
