import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelPtinfoCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-ptinfo-companysettings/model-ptinfo-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-ptinfo-company-settings',
  templateUrl: './ptinfo-company-settings.component.html',
  styleUrls: ['./ptinfo-company-settings.component.css']
})
export class PTInfoCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  Createptinfo() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelPtinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
 Viewptinfo() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelPtinfoCompanysettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeletePtInfo() {
    const initialState = {
      Text: 'Pt Info'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
