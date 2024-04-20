import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  country_code: any;
  customer_id: any;
  user_category_id: any;
  block_user_type: any;
  login_status = true;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _iframeService: IframeService,
    private _apiservice:ApiService,
  ) {}

  firstFormGroup = this._formBuilder.group({
    pop: ['', Validators.required],
  });

  get country1() {
    return this.firstFormGroup.get('pop');
  }
  login_id: any;
  ngOnInit() {
    this._iframeService.getIframeData.subscribe((res) => {
      console.log(res,'iframe_data');

      this.country_code = res?.country_code;
      this.customer_id = res?.customer_id;
      this.login_id = res?.login_id;

      if (this.login_id != undefined) {
        this._apiservice
          .getlogindata(this.country_code, this.customer_id, this.login_id)
          .subscribe((res) => {
            this.user_category_id = res.data[0].category_type;
            this.block_user_type =
              res.data[0].user_registration_login_approval_status;

            if ([0, 1, 4].includes(this.user_category_id)) {
              this.router.navigate(['/table-view']);
              console.log('user');
            } else if ([2, 3].includes(this.user_category_id)) {
              this.router.navigate(['/creator-view']);
              console.log('creator');
            }
          });
      }
    });
  }
}
