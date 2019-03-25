import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

   onClose: Subject<any>;
   Heading: string;
   Text: string;
   Text_Line: string;
   constructor(public bsModalRef: BsModalRef) { }

   ngOnInit() {
      this.onClose = new Subject();
   }
   Cancel() {
      this.onClose.next({Status: false});
      this.bsModalRef.hide();
   }
   Proceed() {
      this.onClose.next({Status: true});
      this.bsModalRef.hide();
   }

}
