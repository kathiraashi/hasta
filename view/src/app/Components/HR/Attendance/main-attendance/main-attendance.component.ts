import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-attendance',
  templateUrl: './main-attendance.component.html',
  styleUrls: ['./main-attendance.component.css']
})
export class MainAttendanceComponent implements OnInit {
   Active_Tab = 'Attendance_Log';

   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
}
