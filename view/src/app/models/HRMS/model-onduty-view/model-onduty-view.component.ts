import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-onduty-view',
  templateUrl: './model-onduty-view.component.html',
  styleUrls: ['./model-onduty-view.component.css']
})
export class ModelOndutyViewComponent implements OnInit {

   Type: string;
   constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
