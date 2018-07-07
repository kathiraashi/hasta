import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelPermissionsHrmsComponent } from '../../../../models/HRMS/model-permissions-hrms/model-permissions-hrms.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-permissions-hrms',
  templateUrl: './permissions-hrms.component.html',
  styleUrls: ['./permissions-hrms.component.css']
})
export class PermissionsHrmsComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreatePermissions() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelPermissionsHrmsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewPermissions() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelPermissionsHrmsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeletePermissions() {
    const initialState = {
      Text: 'Permissions'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
