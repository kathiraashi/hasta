import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelTicketsCrmCustomersComponent } from '../../../../../../models/CRM/Customers/model-tickets-crm-customers/model-tickets-crm-customers.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-tickets-crm-customers-view',
  templateUrl: './tickets-crm-customers-view.component.html',
  styleUrls: ['./tickets-crm-customers-view.component.css']
})
export class TicketsCrmCustomersViewComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateTickets() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelTicketsCrmCustomersComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewTickets() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelTicketsCrmCustomersComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteTickets() {
    const initialState = {
      Text: 'Tickets'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
