import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-contact-crm-customers-view',
  templateUrl: './model-contact-crm-customers-view.component.html',
  styleUrls: ['./model-contact-crm-customers-view.component.css']
})
export class ModelContactCrmCustomersViewComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
