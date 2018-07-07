import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-pipelinestatus-crmsettings',
  templateUrl: './model-pipelinestatus-crmsettings.component.html',
  styleUrls: ['./model-pipelinestatus-crmsettings.component.css']
})
export class ModelPipelinestatusCrmsettingsComponent implements OnInit {

  Type: String;
  constructor(public bsModalRef: BsModalRef) {}


  ngOnInit() {
  }

}
