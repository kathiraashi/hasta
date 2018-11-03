import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/Hr/';
const Live_API_URL = 'http://159.89.163.252:4000/API/Hr/';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

constructor(private http: Http) { }

// Employee
   public EmployeeCode_Validate(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'EmployeeCode_Validate', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Attendance_Create(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'Attendance_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Attendance_Update(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'Attendance_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

}
