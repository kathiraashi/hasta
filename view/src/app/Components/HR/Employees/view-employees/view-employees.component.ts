import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
   Active_Tab = 'personal_info';

  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
     this.Active_Tab = name;
  }

}
