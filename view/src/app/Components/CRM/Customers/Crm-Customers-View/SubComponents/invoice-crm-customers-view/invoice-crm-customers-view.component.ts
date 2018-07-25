import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
  selector: 'app-invoice-crm-customers-view',
  templateUrl: './invoice-crm-customers-view.component.html',
  styleUrls: ['./invoice-crm-customers-view.component.css']
})
export class InvoiceCrmCustomersViewComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }


  ngOnInit() {
  }

}
