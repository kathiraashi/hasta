import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-tickets-activity-create',
  templateUrl: './model-tickets-activity-create.component.html',
  styleUrls: ['./model-tickets-activity-create.component.css']
})
export class ModelTicketsActivityCreateComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
