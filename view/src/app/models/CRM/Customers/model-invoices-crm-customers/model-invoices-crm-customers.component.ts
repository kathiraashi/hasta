import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-model-invoices-crm-customers',
  templateUrl: './model-invoices-crm-customers.component.html',
  styleUrls: ['./model-invoices-crm-customers.component.css']
})
export class ModelInvoicesCrmCustomersComponent implements OnInit {

  Type: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
