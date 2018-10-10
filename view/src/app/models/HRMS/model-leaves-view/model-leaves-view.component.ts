import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { LoginService } from '../../../services/LoginService/login.service';


@Component({
  selector: 'app-model-leaves-view',
  templateUrl: './model-leaves-view.component.html',
  styleUrls: ['./model-leaves-view.component.css']
})
export class ModelLeavesViewComponent implements OnInit {

   Type: string;
   User_Id;
   Data;
   constructor(public bsModalRef: BsModalRef,
      public Login_Service: LoginService) {
      this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
   }

  ngOnInit() {
  }

}
