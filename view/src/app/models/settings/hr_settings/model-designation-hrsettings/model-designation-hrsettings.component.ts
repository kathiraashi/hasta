import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-designation-hrsettings',
  templateUrl: './model-designation-hrsettings.component.html',
  styleUrls: ['./model-designation-hrsettings.component.css']
})
export class ModelDesignationHrsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
