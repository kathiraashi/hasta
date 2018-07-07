import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-model-activitystatus-crmsettings',
  templateUrl: './model-activitystatus-crmsettings.component.html',
  styleUrls: ['./model-activitystatus-crmsettings.component.css']
})
export class ModelActivitystatusCrmsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
