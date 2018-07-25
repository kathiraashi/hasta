import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-attendance-log-create',
  templateUrl: './model-attendance-log-create.component.html',
  styleUrls: ['./model-attendance-log-create.component.css']
})
export class ModelAttendanceLogCreateComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
