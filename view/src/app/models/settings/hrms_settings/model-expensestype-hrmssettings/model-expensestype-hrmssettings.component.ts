import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-expensestype-hrmssettings',
  templateUrl: './model-expensestype-hrmssettings.component.html',
  styleUrls: ['./model-expensestype-hrmssettings.component.css']
})
export class ModelExpensestypeHrmssettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
