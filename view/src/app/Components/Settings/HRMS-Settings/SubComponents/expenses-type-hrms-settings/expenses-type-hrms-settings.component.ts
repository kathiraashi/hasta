import { Component, OnInit } from '@angular/core';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelExpensestypeHrmssettingsComponent } from '../../../../../models/settings/hrms_settings/model-expensestype-hrmssettings/model-expensestype-hrmssettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-expenses-type-hrms-settings',
  templateUrl: './expenses-type-hrms-settings.component.html',
  styleUrls: ['./expenses-type-hrms-settings.component.css']
})
export class ExpensesTypeHrmsSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateExpensesType() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelExpensestypeHrmssettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewExpensesType() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelExpensestypeHrmssettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteExpensesType() {
    const initialState = {
      Text: 'Expenses Type'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
