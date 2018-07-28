import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/Leads_Settings/';

@Injectable({
  providedIn: 'root'
})
export class LeadsSettingsService {

  constructor(private http: Http) { }

  // Lead Source
  public LeadSource_AsyncValidate(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'LeadSource_AsyncValidate', Info)
    .pipe( map(response => response),  catchError(error => of(error)));
  }
  public Lead_Source_Create(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Lead_Source_Create', Info)
    .pipe( map(response => response),  catchError(error => of(error)));
  }
  public Lead_Source_List(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Lead_Source_List', Info)
    .pipe( map(response => response), catchError(error => of(error)));
  }
  public Lead_Source_SimpleList(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Lead_Source_SimpleList', Info)
    .pipe( map(response => response),  catchError(error => of(error)));
  }
  public Lead_Source_Update(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Lead_Source_Update', Info)
    .pipe( map(response => response), catchError(error => of(error)));
  }
  public Lead_Source_Delete(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Lead_Source_Delete', Info)
    .pipe( map(response => response),  catchError(error => of(error)));
  }


}
