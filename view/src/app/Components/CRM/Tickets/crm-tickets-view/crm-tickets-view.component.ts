import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelTicketsActivityCreateComponent } from '../../../../models/CRM/Tickets/model-tickets-activity-create/model-tickets-activity-create.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-crm-tickets-view',
  templateUrl: './crm-tickets-view.component.html',
  styleUrls: ['./crm-tickets-view.component.css']
})
export class CrmTicketsViewComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateTicketsActivity() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelTicketsActivityCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewTicketsActivity() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelTicketsActivityCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteTicketsActivity() {
    const initialState = {
      Text: 'TicketsActivity'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
