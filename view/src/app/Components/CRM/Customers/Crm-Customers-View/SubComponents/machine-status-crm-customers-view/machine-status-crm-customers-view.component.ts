import { Component, OnInit, Input } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-machine-status-crm-customers-view',
  templateUrl: './machine-status-crm-customers-view.component.html',
  styleUrls: ['./machine-status-crm-customers-view.component.css']
})
export class MachineStatusCrmCustomersViewComponent implements OnInit {

   @Input() CustomerData: Object;

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b3c7268f838b31bc89e7c8c';

   Loader: Boolean = true;

   _List: any[] = [];

   bsModalRef: BsModalRef;

   constructor(
                private modalService: BsModalService
             ) { }

   ngOnInit() {
      setTimeout(() => {
         this.Loader = false;
      }, 1000);
   }

}
