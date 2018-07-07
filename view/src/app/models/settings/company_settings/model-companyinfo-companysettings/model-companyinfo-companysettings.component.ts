import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-companyinfo-companysettings',
  templateUrl: './model-companyinfo-companysettings.component.html',
  styleUrls: ['./model-companyinfo-companysettings.component.css']
})
export class ModelCompanyinfoCompanysettingsComponent implements OnInit {

  title: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
