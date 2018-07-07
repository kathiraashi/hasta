import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelPfinfoCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-pfinfo-companysettings/model-pfinfo-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-pfinfo-company-settings',
  templateUrl: './pfinfo-company-settings.component.html',
  styleUrls: ['./pfinfo-company-settings.component.css']
})
export class PFInfoCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
CreatePfInfo() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelPfinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
 ViewPfInfo() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelPfinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeletePfInfo() {
    const initialState = {
      Text: 'Pf Info'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}

