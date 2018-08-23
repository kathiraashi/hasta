import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelAttendanceLogCreateComponent } from '../../../../../models/HR/model-attendance-log-create/model-attendance-log-create.component';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-attendance-log-hr',
  templateUrl: './attendance-log-hr.component.html',
  styleUrls: ['./attendance-log-hr.component.css']
})
export class AttendanceLogHrComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

   ngOnInit() {
   }
   CreateAttendanceLog() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelAttendanceLogCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   ViewAttendanceLog() {
      const initialState = {
         Type: 'View'
      };
      this.bsModalRef = this.modalService.show(ModelAttendanceLogCreateComponent, Object.assign({initialState}, { class: '' }));
   }
   DeleteAttendanceLog() {
      const initialState = {
         Text: 'Attendance Log'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }

}
