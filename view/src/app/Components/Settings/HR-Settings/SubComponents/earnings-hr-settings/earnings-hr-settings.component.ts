import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelEarningsHrsettingsComponent } from '../../../../../models/settings/hr_settings/model-earnings-hrsettings/model-earnings-hrsettings.component';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-earnings-hr-settings',
  templateUrl: './earnings-hr-settings.component.html',
  styleUrls: ['./earnings-hr-settings.component.css']
})
export class EarningsHrSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  ngOnInit() {
  }
  CreateEarnings() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelEarningsHrsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewEarnings() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelEarningsHrsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteEarnings() {
    const initialState = {
      Text: 'Earnings '
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
