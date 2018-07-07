import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-hrms-settings',
  templateUrl: './main-hrms-settings.component.html',
  styleUrls: ['./main-hrms-settings.component.css']
})
export class MainHrmsSettingsComponent implements OnInit {
  Active_Tab = 'Leave_Type';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
