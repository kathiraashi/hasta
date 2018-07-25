import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-employees-create',
  templateUrl: './model-employees-create.component.html',
  styleUrls: ['./model-employees-create.component.css']
})
export class ModelEmployeesCreateComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
