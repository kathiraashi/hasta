import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-tickets-create',
  templateUrl: './model-tickets-create.component.html',
  styleUrls: ['./model-tickets-create.component.css']
})
export class ModelTicketsCreateComponent implements OnInit {

  Type: string;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
