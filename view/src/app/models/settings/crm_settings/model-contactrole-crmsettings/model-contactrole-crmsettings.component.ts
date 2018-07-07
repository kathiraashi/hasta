import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-contactrole-crmsettings',
  templateUrl: './model-contactrole-crmsettings.component.html',
  styleUrls: ['./model-contactrole-crmsettings.component.css']
})
export class ModelContactroleCrmsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
