import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelPaymenttermsAccountsettingsComponent } from '../../../../../models/settings/account_settings/model-paymentterms-accountsettings/model-paymentterms-accountsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-payment-terms-account-settings',
  templateUrl: './payment-terms-account-settings.component.html',
  styleUrls: ['./payment-terms-account-settings.component.css']
})
export class PaymentTermsAccountSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }


  ngOnInit() {
  }
  CreatePaymentTerm() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelPaymenttermsAccountsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewPaymentTerm() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelPaymenttermsAccountsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeletePaymentTerm() {
    const initialState = {
      Text: 'Payment Terms'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
