import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelActivitiesCrmCustomersComponent } from '../../../../../../models/CRM/Customers/model-activities-crm-customers/model-activities-crm-customers.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-activity-crm-customers-view',
  templateUrl: './activity-crm-customers-view.component.html',
  styleUrls: ['./activity-crm-customers-view.component.css']
})
export class ActivityCrmCustomersViewComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }


  ngOnInit() {
  }
  CreateActivities() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelActivitiesCrmCustomersComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewActivities() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelActivitiesCrmCustomersComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteActivities() {
    const initialState = {
      Text: 'Activities'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
