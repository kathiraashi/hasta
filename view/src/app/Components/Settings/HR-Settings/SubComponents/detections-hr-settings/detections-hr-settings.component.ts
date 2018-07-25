import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelDetectionsHrsettingsComponent } from '../../../../../models/settings/hr_settings/model-detections-hrsettings/model-detections-hrsettings.component';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-detections-hr-settings',
  templateUrl: './detections-hr-settings.component.html',
  styleUrls: ['./detections-hr-settings.component.css']
})
export class DetectionsHrSettingsComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  CreateDetections() {
    const initialState = {
      Type: 'Create'
    };
    this.bsModalRef = this.modalService.show(ModelDetectionsHrsettingsComponent, Object.assign({initialState}, { class: 'modal-lg' }));
  }
  ViewDetections() {
    const initialState = {
      Type: 'View'
    };
    this.bsModalRef = this.modalService.show(ModelDetectionsHrsettingsComponent, Object.assign({initialState}, { class: '' }));
  }
  DeleteDetections() {
    const initialState = {
      Text: 'Detections '
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
  }
}
