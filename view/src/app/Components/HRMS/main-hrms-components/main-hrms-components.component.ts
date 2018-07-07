import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-hrms-components',
  templateUrl: './main-hrms-components.component.html',
  styleUrls: ['./main-hrms-components.component.css']
})
export class MainHrmsComponentsComponent implements OnInit {

Active_Tab = 'Dashboard';

  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
this.Active_Tab = name;
}
}
