import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-detections-hrsettings',
  templateUrl: './model-detections-hrsettings.component.html',
  styleUrls: ['./model-detections-hrsettings.component.css']
})
export class ModelDetectionsHrsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
