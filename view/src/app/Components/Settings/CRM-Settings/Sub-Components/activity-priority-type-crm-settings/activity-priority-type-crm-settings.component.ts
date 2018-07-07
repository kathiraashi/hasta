import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelActivitypriorityCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-activitypriority-crmsettings/model-activitypriority-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-activity-priority-type-crm-settings',
  templateUrl: './activity-priority-type-crm-settings.component.html',
  styleUrls: ['./activity-priority-type-crm-settings.component.css']
})
export class ActivityPriorityTypeCrmSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  ngOnInit() {
  }
  CreateActivitypriority() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelActivitypriorityCrmsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewActivitypriority() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelActivitypriorityCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteActivitypriority() {
    const initialState = {
      Text: 'Activity Priority'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
