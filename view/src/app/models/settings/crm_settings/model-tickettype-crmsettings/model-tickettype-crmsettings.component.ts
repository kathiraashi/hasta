import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-tickettype-crmsettings',
  templateUrl: './model-tickettype-crmsettings.component.html',
  styleUrls: ['./model-tickettype-crmsettings.component.css']
})
export class ModelTickettypeCrmsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
