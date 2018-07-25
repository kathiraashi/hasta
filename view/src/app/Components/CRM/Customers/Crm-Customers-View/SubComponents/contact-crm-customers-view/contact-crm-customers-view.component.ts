import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelContactCrmCustomersViewComponent } from '../../../../../../models/CRM/Customers/model-contact-crm-customers-view/model-contact-crm-customers-view.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-contact-crm-customers-view',
  templateUrl: './contact-crm-customers-view.component.html',
  styleUrls: ['./contact-crm-customers-view.component.css']
})
export class ContactCrmCustomersViewComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateContact() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelContactCrmCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewContact() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelContactCrmCustomersViewComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteContact() {
    const initialState = {
      Text: 'Contact'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
