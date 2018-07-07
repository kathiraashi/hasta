import { Component, OnInit } from '@angular/core';


import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-model-onduty-hrms',
  templateUrl: './model-onduty-hrms.component.html',
  styleUrls: ['./model-onduty-hrms.component.css']
})
export class ModelOndutyHrmsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
