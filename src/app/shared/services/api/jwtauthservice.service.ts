import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtauthserviceService {
  return!: string;

  constructor(private route: ActivatedRoute) {
    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsImN1c3RvbWVyX2lkIjo3LCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSIsImxvZ2luX2lkIjoxLCJjb3VudHJ5X2NvZGUiOiJpbiIsImFwcF9pZCI6MzcsIndvd19hc3NpZ25tZW50X2lkIjoxMjMsInJlcGx5X2Zyb21fZW50cnlfY3JlYXRvcl9vcl9jb2xsYWJvcmF0b3JfdXNlcl9pZCI6NH0sImlhdCI6MTcwNTcyNjkzMiwiZXhwIjoxODY1NzI2OTMyfQ.QqgGZYGHanlICz1v3gfad20gDt1RoXpXazS7HJZgBYw'
    // );
    this.route.queryParams.subscribe(
      (params) => (this.return = params['return'] || '/')
    );
  }

  getJwtToken() {
    let HTTP_OPTIONS = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // AuthenticationToken: localStorage.getItem('access_token') as any,
      }),
    };

    return HTTP_OPTIONS;
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }
}
