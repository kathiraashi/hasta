import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-branch-companysettings',
  templateUrl: './model-branch-companysettings.component.html',
  styleUrls: ['./model-branch-companysettings.component.css']
})
export class ModelBranchCompanysettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
