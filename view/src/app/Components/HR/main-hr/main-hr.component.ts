import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-hr',
  templateUrl: './main-hr.component.html',
  styleUrls: ['./main-hr.component.css']
})
export class MainHrComponent implements OnInit {
Active_Tab = 'Employees';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
