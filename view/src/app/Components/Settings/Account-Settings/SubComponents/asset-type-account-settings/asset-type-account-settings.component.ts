import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelAssettypeAccountsettingsComponent } from '../../../../../models/settings/account_settings/model-assettype-accountsettings/model-assettype-accountsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-asset-type-account-settings',
  templateUrl: './asset-type-account-settings.component.html',
  styleUrls: ['./asset-type-account-settings.component.css']
})
export class AssetTypeAccountSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  ngOnInit() {
  }
  CreateAssetType() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelAssettypeAccountsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewAssetType() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelAssettypeAccountsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteAssetType() {
    const initialState = {
      Text: 'Asset Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
