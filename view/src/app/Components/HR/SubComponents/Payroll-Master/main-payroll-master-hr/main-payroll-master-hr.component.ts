import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelPayrollMasterViewComponent } from '../../../../../models/HR/model-payroll-master-view/model-payroll-master-view.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-main-payroll-master-hr',
  templateUrl: './main-payroll-master-hr.component.html',
  styleUrls: ['./main-payroll-master-hr.component.css']
})
export class MainPayrollMasterHrComponent implements OnInit {

  bsModalRef: BsModalRef;
constructor( private modalService: BsModalService) { }


  ngOnInit() {
  }
ViewPayrollMaster() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelPayrollMasterViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeletePayrollMaster() {
    const initialState = {
      Text: 'PayrollMaster'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
