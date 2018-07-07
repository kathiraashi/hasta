import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-ptinfo-companysettings',
  templateUrl: './model-ptinfo-companysettings.component.html',
  styleUrls: ['./model-ptinfo-companysettings.component.css']
})
export class ModelPtinfoCompanysettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
