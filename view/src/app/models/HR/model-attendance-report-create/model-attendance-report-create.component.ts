import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-attendance-report-create',
  templateUrl: './model-attendance-report-create.component.html',
  styleUrls: ['./model-attendance-report-create.component.css']
})
export class ModelAttendanceReportCreateComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
