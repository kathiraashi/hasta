import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelOndutyViewComponent } from '../../../../models/HRMS/model-onduty-view/model-onduty-view.component';


@Component({
  selector: 'app-list-on-duty',
  templateUrl: './list-on-duty.component.html',
  styleUrls: ['./list-on-duty.component.css']
})
export class ListOnDutyComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

  ngOnInit() {
  }
  ViewOnDuty() {
      const initialState = {
         Type: 'View'
      };
      this.bsModalRef = this.modalService.show(ModelOndutyViewComponent, Object.assign({initialState}, { class: 'modal-md' }));
   }
}
