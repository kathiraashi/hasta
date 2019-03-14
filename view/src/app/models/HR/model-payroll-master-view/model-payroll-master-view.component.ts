import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-model-payroll-master-view',
  templateUrl: './model-payroll-master-view.component.html',
  styleUrls: ['./model-payroll-master-view.component.css']
})
export class ModelPayrollMasterViewComponent implements OnInit {

   Type: string;
   constructor(public bsModalRef: BsModalRef) {}

   ngOnInit() {
   }

}
