import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-invoices-crm-customers',
  templateUrl: './model-invoices-crm-customers.component.html',
  styleUrls: ['./model-invoices-crm-customers.component.css']
})
export class ModelInvoicesCrmCustomersComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
