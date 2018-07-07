import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelLeavesHrmsComponent } from './../../../../models/HRMS/model-leaves-hrms/model-leaves-hrms.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-leaves-hrms',
  templateUrl: './leaves-hrms.component.html',
  styleUrls: ['./leaves-hrms.component.css']
})
export class LeavesHrmsComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }


  ngOnInit() {
  }
  CreateLeaves() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelLeavesHrmsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewLeaves() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelLeavesHrmsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteLeaves() {
    const initialState = {
      Text: 'Leaves'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
