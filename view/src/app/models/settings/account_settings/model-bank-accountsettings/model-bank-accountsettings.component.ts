import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-bank-accountsettings',
  templateUrl: './model-bank-accountsettings.component.html',
  styleUrls: ['./model-bank-accountsettings.component.css']
})
export class ModelBankAccountsettingsComponent implements OnInit {
  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
