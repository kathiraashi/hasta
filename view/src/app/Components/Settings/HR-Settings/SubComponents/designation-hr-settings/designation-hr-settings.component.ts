import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelDesignationHrsettingsComponent } from '../../../../../models/settings/hr_settings/model-designation-hrsettings/model-designation-hrsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-designation-hr-settings',
  templateUrl: './designation-hr-settings.component.html',
  styleUrls: ['./designation-hr-settings.component.css']
})
export class DesignationHrSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateDesignation() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelDesignationHrsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewDesignation() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelDesignationHrsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteDesignation() {
    const initialState = {
      Text: 'Designation Hr Settings'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
