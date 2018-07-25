import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelTicketsCreateComponent } from '../../../../models/CRM/Machines/model-tickets-create/model-tickets-create.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-crm-machines-create',
  templateUrl: './crm-machines-create.component.html',
  styleUrls: ['./crm-machines-create.component.css']
})
export class CrmMachinesCreateComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateTickets() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelTicketsCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteTickets() {
    const initialState = {
      Text: 'Tickets'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
