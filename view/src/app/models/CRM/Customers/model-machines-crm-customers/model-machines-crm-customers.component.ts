import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-model-machines-crm-customers',
  templateUrl: './model-machines-crm-customers.component.html',
  styleUrls: ['./model-machines-crm-customers.component.css']
})
export class ModelMachinesCrmCustomersComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
