import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-permissions-hrms',
  templateUrl: './model-permissions-hrms.component.html',
  styleUrls: ['./model-permissions-hrms.component.css']
})
export class ModelPermissionsHrmsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) { }


  ngOnInit() {
  }

}
