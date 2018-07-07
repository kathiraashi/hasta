import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-contactinfo-companysettings',
  templateUrl: './model-contactinfo-companysettings.component.html',
  styleUrls: ['./model-contactinfo-companysettings.component.css']
})
export class ModelContactinfoCompanysettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {

  }


  ngOnInit() {
    console.log(this.Type);
  }

}
