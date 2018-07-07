import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-incometype-accountsettings',
  templateUrl: './model-incometype-accountsettings.component.html',
  styleUrls: ['./model-incometype-accountsettings.component.css']
})
export class ModelIncometypeAccountsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
