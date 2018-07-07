import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelIndustrytypeCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-industrytype-crmsettings/model-industrytype-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-industry-type-crm-settings',
  templateUrl: './industry-type-crm-settings.component.html',
  styleUrls: ['./industry-type-crm-settings.component.css']
})
export class IndustryTypeCrmSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  CreateIndustrytype() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelIndustrytypeCrmsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewIndustrytype() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelIndustrytypeCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteIndustryType() {
    const initialState = {
      Text: 'Industry Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
