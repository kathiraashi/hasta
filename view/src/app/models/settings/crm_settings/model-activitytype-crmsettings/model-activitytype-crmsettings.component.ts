import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-activitytype-crmsettings',
  templateUrl: './model-activitytype-crmsettings.component.html',
  styleUrls: ['./model-activitytype-crmsettings.component.css']
})
export class ModelActivitytypeCrmsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}
  ngOnInit() {
  }

}
