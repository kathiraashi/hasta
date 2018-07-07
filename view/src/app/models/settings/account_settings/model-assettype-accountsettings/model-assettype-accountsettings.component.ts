import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-assettype-accountsettings',
  templateUrl: './model-assettype-accountsettings.component.html',
  styleUrls: ['./model-assettype-accountsettings.component.css']
})
export class ModelAssettypeAccountsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
