import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelPipelinestatusCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-pipelinestatus-crmsettings/model-pipelinestatus-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-pipe-line-status-type-crm-settings',
  templateUrl: './pipe-line-status-type-crm-settings.component.html',
  styleUrls: ['./pipe-line-status-type-crm-settings.component.css']
})
export class PipeLineStatusTypeCrmSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreatePipelineStatus() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelPipelinestatusCrmsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewPipelineStatus() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelPipelinestatusCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeletePipelineStatus() {
    const initialState = {
      Text: 'Pipeline Status'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
