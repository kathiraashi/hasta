import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelQuotetermsCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-quoteterms-crmsettings/model-quoteterms-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-quote-terms-type-crm-settings',
  templateUrl: './quote-terms-type-crm-settings.component.html',
  styleUrls: ['./quote-terms-type-crm-settings.component.css']
})
export class QuoteTermsTypeCrmSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateQuoteTerms() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelQuotetermsCrmsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewQuoteTerms() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelQuotetermsCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteQuoteTerms() {
    const initialState = {
      Text: 'Quote Terms'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
