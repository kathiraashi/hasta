import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-taxes-accountsettings',
  templateUrl: './model-taxes-accountsettings.component.html',
  styleUrls: ['./model-taxes-accountsettings.component.css']
})
export class ModelTaxesAccountsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
