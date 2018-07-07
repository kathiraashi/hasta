import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-quoteterms-crmsettings',
  templateUrl: './model-quoteterms-crmsettings.component.html',
  styleUrls: ['./model-quoteterms-crmsettings.component.css']
})
export class ModelQuotetermsCrmsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
