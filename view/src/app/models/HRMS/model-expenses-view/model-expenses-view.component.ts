import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginService } from '../../../services/LoginService/login.service';

@Component({
  selector: 'app-model-expenses-view',
  templateUrl: './model-expenses-view.component.html',
  styleUrls: ['./model-expenses-view.component.css']
})
export class ModelExpensesViewComponent implements OnInit {

   Type: string;
   User_Id;
   _Data: Object = {};

   constructor(public bsModalRef: BsModalRef,
      public Login_Service: LoginService) {
      this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
   }

  ngOnInit() {
  }

}
