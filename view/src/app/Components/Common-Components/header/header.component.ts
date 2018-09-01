import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../../services/LoginService/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   Type;

  constructor(public router: Router, public Login_Service: LoginService) {
     this.Type = this.Login_Service.LoginUser_Info()['User_Type'];
  }

  ngOnInit() {
  }

  LogOut() {
    sessionStorage.clear();
    this.router.navigate(['/Login']);
 }

}
