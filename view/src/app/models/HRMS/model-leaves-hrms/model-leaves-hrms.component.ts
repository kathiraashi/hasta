import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-leaves-hrms',
  templateUrl: './model-leaves-hrms.component.html',
  styleUrls: ['./model-leaves-hrms.component.css']
})
export class ModelLeavesHrmsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) { }


  ngOnInit() {
  }

}
