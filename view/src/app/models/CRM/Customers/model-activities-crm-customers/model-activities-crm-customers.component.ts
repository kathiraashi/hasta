import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-activities-crm-customers',
  templateUrl: './model-activities-crm-customers.component.html',
  styleUrls: ['./model-activities-crm-customers.component.css']
})
export class ModelActivitiesCrmCustomersComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
