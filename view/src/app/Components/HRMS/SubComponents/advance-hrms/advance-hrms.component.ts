import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelAdvanceHrmsComponent } from '../../../../models/HRMS/model-advance-hrms/model-advance-hrms.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-advance-hrms',
  templateUrl: './advance-hrms.component.html',
  styleUrls: ['./advance-hrms.component.css']
})
export class AdvanceHrmsComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateAdvance() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelAdvanceHrmsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewAdvance() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelAdvanceHrmsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteAdvance() {
    const initialState = {
      Text: 'Advance'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
