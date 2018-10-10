import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelPermissionsViewComponent } from '../../../../models/HRMS/model-permissions-view/model-permissions-view.component';

@Component({
  selector: 'app-list-permissions',
  templateUrl: './list-permissions.component.html',
  styleUrls: ['./list-permissions.component.css']
})
export class ListPermissionsComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  ViewPermissions() {
   const initialState = {
      Type: 'View'
   };
   this.bsModalRef = this.modalService.show(ModelPermissionsViewComponent, Object.assign({initialState}, { class: 'modal-md' }));
}
}
