import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-employeecategory-hrsettings',
  templateUrl: './model-employeecategory-hrsettings.component.html',
  styleUrls: ['./model-employeecategory-hrsettings.component.css']
})
export class ModelEmployeecategoryHrsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
