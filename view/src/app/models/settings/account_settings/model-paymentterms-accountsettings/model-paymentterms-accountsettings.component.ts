import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-paymentterms-accountsettings',
  templateUrl: './model-paymentterms-accountsettings.component.html',
  styleUrls: ['./model-paymentterms-accountsettings.component.css']
})
export class ModelPaymenttermsAccountsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
