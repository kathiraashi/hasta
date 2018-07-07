import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-registrationinfo-companysettings',
  templateUrl: './model-registrationinfo-companysettings.component.html',
  styleUrls: ['./model-registrationinfo-companysettings.component.css']
})
export class ModelRegistrationinfoCompanysettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
