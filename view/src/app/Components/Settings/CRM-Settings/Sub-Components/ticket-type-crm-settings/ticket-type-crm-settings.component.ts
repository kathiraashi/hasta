import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelTickettypeCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-tickettype-crmsettings/model-tickettype-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-ticket-type-crm-settings',
  templateUrl: './ticket-type-crm-settings.component.html',
  styleUrls: ['./ticket-type-crm-settings.component.css']
})
export class TicketTypeCrmSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateTicketType() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelTickettypeCrmsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewTicketType() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelTickettypeCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteTicketType() {
    const initialState = {
      Text: 'Ticket Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
