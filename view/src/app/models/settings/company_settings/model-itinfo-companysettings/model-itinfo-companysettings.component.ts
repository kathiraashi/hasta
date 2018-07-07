import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-itinfo-companysettings',
  templateUrl: './model-itinfo-companysettings.component.html',
  styleUrls: ['./model-itinfo-companysettings.component.css']
})
export class ModelItinfoCompanysettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
