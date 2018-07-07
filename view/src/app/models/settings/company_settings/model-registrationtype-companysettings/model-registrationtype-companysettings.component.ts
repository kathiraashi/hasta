import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-registrationtype-companysettings',
  templateUrl: './model-registrationtype-companysettings.component.html',
  styleUrls: ['./model-registrationtype-companysettings.component.css']
})
export class ModelRegistrationtypeCompanysettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
