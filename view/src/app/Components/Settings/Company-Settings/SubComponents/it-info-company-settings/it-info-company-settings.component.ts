import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelItinfoCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-itinfo-companysettings/model-itinfo-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-it-info-company-settings',
  templateUrl: './it-info-company-settings.component.html',
  styleUrls: ['./it-info-company-settings.component.css']
})
export class ItInfoCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }


  ngOnInit() {
  }
  CreateItInfo() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelItinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewItInfo() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelItinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteItInfo() {
    const initialState = {
      Text: 'It Info'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
