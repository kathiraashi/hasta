import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-crm-settings',
  templateUrl: './main-crm-settings.component.html',
  styleUrls: ['./main-crm-settings.component.css']
})
export class MainCrmSettingsComponent implements OnInit {

Active_Tab = 'Industry_type';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
