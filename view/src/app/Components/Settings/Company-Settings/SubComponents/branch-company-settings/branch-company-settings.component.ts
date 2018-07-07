import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelBranchCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-branch-companysettings/model-branch-companysettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-branch-company-settings',
  templateUrl: './branch-company-settings.component.html',
  styleUrls: ['./branch-company-settings.component.css']
})
export class BranchCompanySettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  Createbranch() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelBranchCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  Viewbranch() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelBranchCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  DeleteBranch() {
    const initialState = {
      Text: 'Branch company settings'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }

}
