import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-leavetype-hrmssettings',
  templateUrl: './model-leavetype-hrmssettings.component.html',
  styleUrls: ['./model-leavetype-hrmssettings.component.css']
})
export class ModelLeavetypeHrmssettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
