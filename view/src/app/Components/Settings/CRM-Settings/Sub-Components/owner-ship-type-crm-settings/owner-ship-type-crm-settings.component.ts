import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelOwnershipytypeCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-ownershipytype-crmsettings/model-ownershipytype-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-owner-ship-type-crm-settings',
  templateUrl: './owner-ship-type-crm-settings.component.html',
  styleUrls: ['./owner-ship-type-crm-settings.component.css']
})
export class OwnerShipTypeCrmSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateOwnershiptype() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelOwnershipytypeCrmsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewOwnershiptype() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelOwnershipytypeCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteOwnershipType() {
    const initialState = {
      Text: 'Ownership Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
