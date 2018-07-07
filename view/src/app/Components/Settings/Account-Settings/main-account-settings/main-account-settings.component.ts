import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-account-settings',
  templateUrl: './main-account-settings.component.html',
  styleUrls: ['./main-account-settings.component.css']
})
export class MainAccountSettingsComponent implements OnInit {
Active_Tab = 'Taxes';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
