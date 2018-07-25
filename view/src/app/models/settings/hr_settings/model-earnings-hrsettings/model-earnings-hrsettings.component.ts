import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-earnings-hrsettings',
  templateUrl: './model-earnings-hrsettings.component.html',
  styleUrls: ['./model-earnings-hrsettings.component.css']
})
export class ModelEarningsHrsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
