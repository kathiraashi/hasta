import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/Hr_Settings/';

@Injectable({
  providedIn: 'root'
})
export class HrSettingsService {

   constructor(private http: Http) { }

   // Employee Category
      public Employee_category_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Employee_category_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Employee_category_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Employee_category_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Employee_category_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Employee_category_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Employee_category_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Employee_category_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Employee_category_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Employee_category_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }

   // Department
      public Department_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Department_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Department_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Department_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Department_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Department_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Department_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Department_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Department_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Department_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }

   // Department
      public Designation_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Designation_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Designation_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Designation_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Designation_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Designation_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Designation_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Designation_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Designation_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Designation_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }

}
