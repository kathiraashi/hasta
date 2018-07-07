import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-advance-hrms',
  templateUrl: './model-advance-hrms.component.html',
  styleUrls: ['./model-advance-hrms.component.css']
})
export class ModelAdvanceHrmsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
