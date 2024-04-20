import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtauthserviceService } from './jwtauthservice.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customer_id: any;
  country_no: any;

  private httpClient: HttpClient;
  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private _jwtAuthService: JwtauthserviceService
  ) {
    this.getvalues();
    this.httpClient = new HttpClient(handler);
  }

  getvalues() {
    this.customer_id = localStorage.getItem('customer_id');
    this.country_no = localStorage.getItem('country_no');
  }

  selectcategorylist(category_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.selectcategorylist}?category_id=${category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //insert global comments private card
  saveinsert(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.saveinsertcommentsprivate}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  gettabledata(country_code:string,customer_id:number,wow_assignment_id:number,login_id:number): Observable<any> {
    return this.http.get<any>(
      `${environment.gettabledata}?country_code=${country_code}&customer_id=${customer_id}&wow_assignment_id=${wow_assignment_id}&login_id=${login_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //update make global comments gobal
  updatemakeglobal(body: any): Observable<any> {
    return this.http.post(
      `${environment.updatemakeglobal}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  //update make global comments private
  updatemakeprivate(body: any): Observable<any> {
    return this.http.post(
      `${environment.updatemakeprivate}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  //update make global comments private
  updatereply(body: any): Observable<any> {
    return this.http.post(
      `${environment.updatereply}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }
  //delete comments
  deletecomments(body: any): Observable<any> {
    return this.http.post(
      `${environment.deletecomments}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  //update comments
updatecomments(body: any): Observable<any> {
    return this.http.post(
      `${environment.updatecomments}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

//card
  //insert global comments private card
  saveinsertcard(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.saveinsertcommentsprivatecard}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  gettabledatacard(country_code:string,customer_id:number,wow_assignment_id:number,login_id:number): Observable<any> {
    return this.http.get<any>(
      `${environment.gettabledatacard}?country_code=${country_code}&customer_id=${customer_id}&wow_assignment_id=${wow_assignment_id}&login_id=${login_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  getallcategoryss(wow_assignment_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.getallcategory}?wow_assignment_id=${wow_assignment_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  getlogindata(country_code:string,customer_id:number,login_id:number): Observable<any> {
    return this.http.get<any>(
      `${environment.getlogindata}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  gettabledatacarduserinsert(country_code:string,customer_id:number,wow_assignment_id:number,login_id:number): Observable<any> {
    return this.http.get<any>(
      `${environment.gettabledatacarduserinsert}?country_code=${country_code}&customer_id=${customer_id}&wow_assignment_id=${wow_assignment_id}&login_id=${login_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  gettabledatauserinserttable(country_code:string,customer_id:number,wow_assignment_id:number,login_id:number): Observable<any> {
    return this.http.get<any>(
      `${environment.gettabledatacarduserinserttable}?country_code=${country_code}&customer_id=${customer_id}&wow_assignment_id=${wow_assignment_id}&login_id=${login_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
}
