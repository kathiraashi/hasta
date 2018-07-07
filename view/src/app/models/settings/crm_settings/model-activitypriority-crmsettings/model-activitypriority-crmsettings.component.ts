import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-activitypriority-crmsettings',
  templateUrl: './model-activitypriority-crmsettings.component.html',
  styleUrls: ['./model-activitypriority-crmsettings.component.css']
})
export class ModelActivitypriorityCrmsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
