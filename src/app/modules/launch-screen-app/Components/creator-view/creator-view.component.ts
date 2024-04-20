import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { DateTime } from 'luxon';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-creator-view',
  templateUrl: './creator-view.component.html',
  styleUrls: ['./creator-view.component.scss'],
})
export class CreatorViewComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = new FormGroup({
    firstCtrl: new FormControl(''),
    replycontrol: new FormControl(''),
    edit: new FormControl(''),
  });
  //* -----------------------  Variable Declaration  -----------------------*//
  groupname: any;

  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  numSelected: any = 0;
  // categoryid: any = 2001;
  // wow_assesment_id: any = 123;

  // comment_from_user_id: any = 2;
  // comment_from_user_name: any = 'Devan Natarajan';
  // comment_from_user_category_name: any = 'Sacred Heart/BCA';
  // comment_from_customer_id: any = 1;
  // comment_from_customer_name: any = 'Getster.Tech';
  // reply_from_entry_creator_or_collaborator_user_id: any = 10;
  // reply_from_comment_text: any = 'ok Sure';

  selected_row: any;
  comment_id_get: any;
  inputValue: any;

  country_code: any;
  customer_id: any;
  login_id: any;
  wow_assignment_id: any;
  wow_class_stream_reference_id: any;
  user_category_allocation_id: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _api_service: ApiService,
    private _snackbar: SnackBarService,
    private dialog: MatDialog, // private datePipe: DatePipe,
    private _iframeService: IframeService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//

  ngOnInit() {
    this._iframeService.getIframeData.subscribe((res) => {
      this.country_code = res.country_code;
      this.customer_id = res.customer_id;
      this.login_id = res.login_id;
      this.wow_assignment_id = res.wow_assignment_id;
      this.wow_class_stream_reference_id = res.wow_class_stream_reference_id;
      this.user_category_allocation_id = res.user_category_allocation_id;
      // this.reply_from_entry_creator_or_collaborator_user_id =
      //   res.reply_from_entry_creator_or_collaborator_user_id;
    });

    // localStorage.setItem('comment_from_user_id', this.comment_from_user_id);
    // localStorage.setItem('comment_from_user_name', this.comment_from_user_name);
    // localStorage.setItem(
    //   'comment_from_user_category_name',
    //   this.comment_from_user_category_name
    // );
    // localStorage.setItem(
    //   'comment_from_customer_id',
    //   this.comment_from_customer_id
    // );
    // localStorage.setItem(
    //   'comment_from_customer_name',
    //   this.comment_from_customer_name
    // );
    // localStorage.setItem(
    //   'reply_from_entry_creator_or_collaborator_user_id',
    //   this.reply_from_entry_creator_or_collaborator_user_id
    // );
    // localStorage.setItem('reply_comment_text', this.reply_from_comment_text);
    // localStorage.setItem('wow-assesment-id', this.wow_assesment_id);

    //api-methods call
    this.gettabledata();

    //addbutton enable

    if (this.inputValue > 0) {
      this.addbtnenable = false;
    } else {
      this.addbtnenable = true;
    }
    if (this.wow_assignment_id != undefined) {
      this.getdescription();
    }
  }
  datasoucedata: any;
  cardDetails: any;
  cardcheck: any;
  card: any;
  wow_assesment_name: any;
  wow_assesment_idd: any;

  //* ----------------------------  APIs Methods  --------------------------*//
  gettabledata() {
    this._api_service
      .gettabledatacard(
        this.country_code,
        this.customer_id,
        this.wow_assignment_id,
        this.login_id
      )
      .subscribe((res) => {
        this.cardDetails = res.data;


        if (this.cardDetails == 1) {
          this._snackbar.datanotfound('contact your administrator');
        }


        for (let i = 0; i < this.cardDetails.length; i++) {
          const element = this.cardDetails[i].user_details.reply_from_datetime;

          this.cardcheck = element;
        }
      });
  }
  showline: boolean = true;

  getdescription() {
    this._api_service
      .getallcategoryss(this.wow_assignment_id)
      .subscribe((res) => {

        if (res.data.length == 0) {
          this._snackbar.success('Data Not Found');
        }

        if (res.data == 1) {
          this._snackbar.datanotfound('contact your administrator');
        }
        this.wow_assesment_idd = res.data[0].global_wow_resource_id;

        this.wow_assesment_name = res.data[0].wow_resource_name;
      });
  }

  addyourglobalcomments() {
    this.disableglobal = true;

    let name1: any = {
      activity_Data: this.firstFormGroup.controls['firstCtrl'].value,
      //    customer_id: this.customer_id,
      // country_code: this.country_code,
      // wow_assignment_id:this.wow_assignment_id,
      // login_id:this.login_id,
      // wow_class_stream_reference_id:this.wow_class_stream_reference_id,
      // user_category_allocation_id:this.user_category_allocation_id
    };
    let name = name1.activity_Data;
    let body: any = {
      comment_text: name,
      // comment_from_user_id: this.comment_from_user_id,
      // comment_from_user_name: this.comment_from_user_name,
      // comment_from_user_category_name: this.comment_from_user_category_name,
      // comment_from_customer_id: this.comment_from_customer_id,
      // comment_from_customer_name: this.comment_from_customer_name,
      // reply_from_entry_creator_or_collaborator_user_id:
      //   this.reply_from_entry_creator_or_collaborator_user_id,
      // reply_from_comment_text: this.reply_from_comment_text,

      customer_id: this.customer_id,
      country_code: this.country_code,
      wow_assignment_id: this.wow_assignment_id,
      login_id: this.login_id,
      wow_class_stream_reference_id: this.wow_class_stream_reference_id,
      user_category_allocation_id: this.user_category_allocation_id,
    };

    this._api_service.saveinsertcard(body).subscribe((res) => {
      if (res.statusCode == 201) {
        this._snackbar.success(res.message);

      } else {
        this._snackbar.error(res.message);
      }

      this._api_service
        .gettabledatacard(
          this.country_code,
          this.customer_id,
          this.wow_assignment_id,
          this.login_id
        )
        .subscribe((res) => {
          this.cardDetails = res.data;

          if (this.cardDetails == 1) {
            // this._spiner.close();
            this._snackbar.datanotfound('contact your administrator');
          }


          for (let i = 0; i < this.cardDetails.length; i++) {
            const element =
              this.cardDetails[i].user_details.reply_from_datetime;

            this.cardcheck = element;
          }
        });
      this.inputValue = null;
    });
  }

  addbtnenable: boolean = true;

  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//
  replytype: any;
  onGetValue(event: any) {
    let value = event.target.value;
    this.replytype = value;
  }
  disableglobal: boolean = true;
  type(e: any) {
    if (e?.length > 0) {
      this.disableglobal = false;
    } else {
      this.disableglobal = true;
    }
  }

  ngDoCheck(): void {}

  value!: string;
  isEditMode = false;

  editField() {
    this.isEditMode = true;
    this.isEditModeOn = false;
  }

  saveField() {
    // save the edited value
    this.isEditMode = false;
  }

  isEditModeOn = true;
  name: string = '';
  getCustomerProfileUrl(ceph_object_id: string) {
    let profileUrl =
      environment.ceph_URL +
      this.country_code +
      '-' +
      this.customer_id +
      '/' +
      ceph_object_id;
    return profileUrl;
  }
  imageuser_id: any;

  uer_img_id: any;
  uer_img_idd: any;
  user_profile(e: any) {
    this.uer_img_id =
      e.user_details.reply_from_entry_creator_or_collaborator_user_id;
  }
  openUserProfile() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      minHeight: 'auto',
      width: '320px',

      data: {
        user_id: this.uer_img_id,
        customer_id: this.customer_id,
        country_id: this.country_code,
      },
    };
    const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }

  user_profile1(e: any) {
    this.uer_img_idd = e.user_details.comment_from_user_id;
  }
  openUserProfile1() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      minHeight: 'auto',
      width: '320px',

      data: {
        user_id: this.uer_img_idd,
        customer_id: this.customer_id,
        country_id: this.country_code,
      },
    };
    const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }
  //! -------------------------------  End  --------------------------------!//
}
