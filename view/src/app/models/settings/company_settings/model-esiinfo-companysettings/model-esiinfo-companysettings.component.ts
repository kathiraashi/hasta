import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-esiinfo-companysettings',
  templateUrl: './model-esiinfo-companysettings.component.html',
  styleUrls: ['./model-esiinfo-companysettings.component.css']
})
export class ModelEsiinfoCompanysettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
