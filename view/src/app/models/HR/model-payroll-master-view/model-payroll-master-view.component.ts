import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-payroll-master-view',
  templateUrl: './model-payroll-master-view.component.html',
  styleUrls: ['./model-payroll-master-view.component.css']
})
export class ModelPayrollMasterViewComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
