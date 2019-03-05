import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../../services/common-services/toastr-service/toastr.service';
import { AttendanceService } from './../../../../../services/Hr/Attendance/attendance.service';

import { LoginService } from './../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-attendance-report-view',
  templateUrl: './attendance-report-view.component.html',
  styleUrls: ['./attendance-report-view.component.css']
})
export class AttendanceReportViewComponent implements OnInit {

  User_Id: any;

  Loader: Boolean = true;
  _Data = {};
  _List: any[] = [];
  Report_Id: any;

  constructor(  private Toastr: ToastrService,
                public Service: AttendanceService,
                public router: Router,
                private active_route: ActivatedRoute,
                public Login_Service: LoginService
              ) {
                this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                this.active_route.url.subscribe((u) => {
                    this.Report_Id = this.active_route.snapshot.params['Report_Id'];
                    const Data = { 'Report_Id': this.Report_Id, 'User_Id' : this.User_Id };
                    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                    Info = Info.toString();
                    this.Service.Attendance_Report_View({ 'Info': Info }).subscribe( response => {
                      const ResponseData = JSON.parse(response['_body']);
                      this.Loader = false;
                      if (response['status'] === 200 && ResponseData['Status'] ) {
                          const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                          const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                          this._Data = DecryptedData;
                          this._List = this._Data['Detailed_Report'];
                      } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                          this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                      } else if (response['status'] === 401 && !ResponseData['Status']) {
                          this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                      } else {
                          this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Attendance Report Getting Error!, But not Identify!' });
                      }
                    });
                });
              }

  ngOnInit() {
  }

}
