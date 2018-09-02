import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/Hrms_Settings/';
const Live_API_URL = 'http://159.89.163.252:4000/API/Hrms_Settings/';

@Injectable({
  providedIn: 'root'
})
export class HrmsSettingsService {

  constructor(private http: Http) { }

   // Leave Type
      public LeaveType_AsyncValidate(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'LeaveType_AsyncValidate', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Leave_Type_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Leave_Type_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Leave_Type_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Leave_Type_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Leave_Type_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Leave_Type_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Leave_Type_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Leave_Type_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Leave_Type_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Leave_Type_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }

      // Expenses Type
      public ExpensesType_AsyncValidate(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'ExpensesType_AsyncValidate', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Expenses_Type_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Expenses_Type_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Expenses_Type_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Expenses_Type_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Expenses_Type_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Expenses_Type_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Expenses_Type_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Expenses_Type_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Expenses_Type_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Expenses_Type_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }

}
