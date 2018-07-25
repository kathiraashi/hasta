import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelMachinesCrmCustomersComponent } from '../../../../../../models/CRM/Customers/model-machines-crm-customers/model-machines-crm-customers.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-machines-crm-customers-view',
  templateUrl: './machines-crm-customers-view.component.html',
  styleUrls: ['./machines-crm-customers-view.component.css']
})
export class MachinesCrmCustomersViewComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }


  ngOnInit() {
  }
  CreateMachines() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelMachinesCrmCustomersComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewMachines() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelMachinesCrmCustomersComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteMachines() {
    const initialState = {
      Text: 'Machines'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
