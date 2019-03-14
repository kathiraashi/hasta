import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-model-tickets-crm-customers',
  templateUrl: './model-tickets-crm-customers.component.html',
  styleUrls: ['./model-tickets-crm-customers.component.css']
})
export class ModelTicketsCrmCustomersComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
