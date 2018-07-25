import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelEmployeesCreateComponent } from '../../../../../models/HR/model-employees-create/model-employees-create.component';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-main-employees-hr',
  templateUrl: './main-employees-hr.component.html',
  styleUrls: ['./main-employees-hr.component.css']
})
export class MainEmployeesHrComponent implements OnInit {
   Active_Tab = 'personal_info';
   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
   this.Active_Tab = name;
   }

   CreateEmployee() {
   const initialState = {
      Type: 'Create'
   };
   this.bsModalRef = this.modalService.show(ModelEmployeesCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   ViewEmployee() {
   const initialState = {
      Type: 'View'
   };
   this.bsModalRef = this.modalService.show(ModelEmployeesCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   DeleteEmployee() {
   const initialState = {
      Text: 'Employee'
   };
   this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }
}
