import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-departments-companysettings',
  templateUrl: './model-departments-companysettings.component.html',
  styleUrls: ['./model-departments-companysettings.component.css']
})
export class ModelDepartmentsCompanysettingsComponent implements OnInit {
  Type: String;
  constructor(public bsModalRef: BsModalRef) {}



  ngOnInit() {
  }

}
