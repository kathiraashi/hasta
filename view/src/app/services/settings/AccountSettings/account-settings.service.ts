import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/API/Account_Settings/';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

   constructor(private http: Http) { }

   // Income Type
      public Income_Type_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Income_Type_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Income_Type_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Income_Type_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Income_Type_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Income_Type_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Income_Type_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Income_Type_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Income_Type_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Income_Type_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }

   // Payment Terms
      public Payment_Terms_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_Create', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Payment_Terms_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_List', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Payment_Terms_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_SimpleList', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }
      public Payment_Terms_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_Update', Info)
         .pipe( map(response => response), catchError(error => of(error)));
      }
      public Payment_Terms_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Payment_Terms_Delete', Info)
         .pipe( map(response => response),  catchError(error => of(error)));
      }

   // Bank
      public Bank_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Bank_Create', Info)
         .pipe(map(response => response), catchError(error => of(error)));
      }
      public Bank_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Bank_List', Info)
         .pipe(map(response => response), catchError(error => of(error)));
      }
      public Bank_Simple_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Bank_Simple_List', Info)
         .pipe(map(response => response), catchError(error => of(error)));
      }
      public Bank_Update(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Bank_Update', Info)
         .pipe(map(response => response), catchError(error => of(error)));
      }
      public Bank_Delete(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Bank_Delete', Info)
         .pipe(map(response => response), catchError(error => of(error)));
      }

}
