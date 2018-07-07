import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelEsiinfoCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-esiinfo-companysettings/model-esiinfo-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';



@Component({
  selector: 'app-esiinfo-company-settings',
  templateUrl: './esiinfo-company-settings.component.html',
  styleUrls: ['./esiinfo-company-settings.component.css']
})
export class ESIInfoCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateEsiInfo() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelEsiinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewEsiInfo() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelEsiinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteEsiInfo() {
    const initialState = {
      Text: 'Esi Company Settings'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
