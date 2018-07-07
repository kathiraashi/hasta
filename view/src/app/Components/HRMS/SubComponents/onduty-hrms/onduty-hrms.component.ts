import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelOndutyHrmsComponent } from '../../../../models/HRMS/model-onduty-hrms/model-onduty-hrms.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-onduty-hrms',
  templateUrl: './onduty-hrms.component.html',
  styleUrls: ['./onduty-hrms.component.css']
})
export class OndutyHrmsComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateOnDuty() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelOndutyHrmsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewOnDuty() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelOndutyHrmsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteOnDuty() {
    const initialState = {
      Text: 'OnDuty'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
