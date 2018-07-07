import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-company-settings',
  templateUrl: './main-company-settings.component.html',
  styleUrls: ['./main-company-settings.component.css']
})
export class MainCompanySettingsComponent implements OnInit {
Active_Tab = 'Company_Info';

  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }

}
