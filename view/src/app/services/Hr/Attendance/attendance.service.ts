import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../../LoginService/login.service';

const API_URL = 'http://localhost:4000/API/Attendance/';
const Live_API_URL = 'http://159.89.163.252:4000/API/Attendance/';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

   headers;
   constructor(private http: Http, private Service: LoginService) {
      this.headers = new Headers();
   }

   ValidateEveryRequest() {
      let Message = JSON.stringify({Status: false, Message: 'Your Login Expired! Please Login Again'});
      if (sessionStorage.getItem('Token') && sessionStorage.getItem('SessionKey') && sessionStorage.getItem('SessionToken') ) {
         const LastSession = new Date(atob(sessionStorage.getItem('SessionKey'))).getTime();
         const NowSession = new Date().getTime();
         const SessionDiff: number = NowSession - LastSession;
         const SessionDiffMinutes: number = SessionDiff / 1000 / 60 ;
         if (SessionDiffMinutes >= 20 ) {
            Message = JSON.stringify({Status: false, Message: 'Your Session Expired! Please Login Again'});
            sessionStorage.clear();
         }
      }
      return Observable.create(observer => {
         const Response = {status: 401, _body: Message };
         observer.next(Response);
         observer.complete();
      });
   }

   // Attendance
   public Attendance_Log(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'Attendance_Log', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public WeekOff_AsyncValidate(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'WeekOff_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public AttendanceDate_AsyncValidate(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'AttendanceDate_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public Attendance_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'Attendance_Create', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }
   public Complete_Attendance_Log(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'Complete_Attendance_Log', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

   public Attendance_Report_Validate(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'Attendance_Report_Validate', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

   public Attendance_Report_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'Attendance_Report_Create', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

   public Attendance_Report_Save(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'Attendance_Report_Save', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

   public Attendance_Report_View(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'Attendance_Report_View', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

   public Attendance_Report_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'Attendance_Report_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

   public Attendance_Report_Delete(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(Live_API_URL + 'Attendance_Report_Delete', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
      } else {
         return this.ValidateEveryRequest();
      }
   }

}
