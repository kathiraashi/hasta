import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-pfinfo-companysettings',
  templateUrl: './model-pfinfo-companysettings.component.html',
  styleUrls: ['./model-pfinfo-companysettings.component.css']
})
export class ModelPfinfoCompanysettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
