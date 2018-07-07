import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-department-hrsettings',
  templateUrl: './model-department-hrsettings.component.html',
  styleUrls: ['./model-department-hrsettings.component.css']
})
export class ModelDepartmentHrsettingsComponent implements OnInit {


  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
