import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LoginService } from '../../../services/LoginService/login.service';

@Component({
  selector: 'app-model-expenses-view',
  templateUrl: './model-expenses-view.component.html',
  styleUrls: ['./model-expenses-view.component.css']
})
export class ModelExpensesViewComponent implements OnInit {

   File_Url = 'http://159.89.163.252:4000/API/Uploads/';
   // File_Url = 'http://localhost:4000/API/Uploads/';

   Type: string;
   User_Id: any;
   _Data: Object = {};

   constructor(public bsModalRef: BsModalRef,
      public Login_Service: LoginService) {
      this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
   }

   ngOnInit() {
   }

}
