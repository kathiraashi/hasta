import { Component, OnInit } from '@angular/core';


import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-ownershipytype-crmsettings',
  templateUrl: './model-ownershipytype-crmsettings.component.html',
  styleUrls: ['./model-ownershipytype-crmsettings.component.css']
})
export class ModelOwnershipytypeCrmsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
