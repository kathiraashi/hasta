import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-model-permissions-view',
  templateUrl: './model-permissions-view.component.html',
  styleUrls: ['./model-permissions-view.component.css']
})
export class ModelPermissionsViewComponent implements OnInit {

   Type: string;
   constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
