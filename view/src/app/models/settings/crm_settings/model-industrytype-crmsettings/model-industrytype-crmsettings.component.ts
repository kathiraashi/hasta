import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-industrytype-crmsettings',
  templateUrl: './model-industrytype-crmsettings.component.html',
  styleUrls: ['./model-industrytype-crmsettings.component.css']
})
export class ModelIndustrytypeCrmsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
