import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/shared/dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';
import { environment } from 'src/environments/environment';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';

export interface PeriodicElement {
  col: string;
  col1: number;
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = new FormGroup({
    firstCtrl: new FormControl(''),
    replycontrol: new FormControl(''),
    edit: new FormControl(''),
  });
  //* -----------------------  Variable Declaration  -----------------------*//
  groupname: any;
  ELEMENT_DATA: PeriodicElement[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  numSelected: any = 0;
  categoryid: any = 2001;
  wow_assesment_id: any = 123;
  wow_assesment_name: any;

  comment_from_user_id: any = 2;
  comment_from_user_name: any = 'Devan Natarajan';
  comment_from_user_category_name: any = 'Sacred Heart/BCA';
  comment_from_customer_id: any = 1;
  comment_from_customer_name: any = 'Getster.Tech';
  reply_from_entry_creator_or_collaborator_user_id: any;
  reply_from_comment_text: any = 'ok Sure';

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
    private dialog: MatDialog,
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
      this.reply_from_entry_creator_or_collaborator_user_id =
        res.reply_from_entry_creator_or_collaborator_user_id;
    });

    //api-methods call
    this.gettabledata();
    // this.gettabledatanew();

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
  wow_assesment_idd: any;
  //* ----------------------------  APIs Methods  --------------------------*//
  gettabledata() {
    // this._spiner.open();

    this._api_service
      .gettabledata(
        this.country_code,
        this.customer_id,
        this.wow_assignment_id,
        this.login_id
      )
      .subscribe((res) => {

        if (res.data == 1) {
          this._snackbar.datanotfound('contact your administrator');
        }
        this.datasoucedata = res.data;

        // this.firstFormGroup.controls['edit'].patchValue(this.datasoucedata.user_details.reply_from_comment_tex);
        let tableData: any[] = [];

        if (res) {
          for (let i = 0; i < this.datasoucedata.length; i++) {
            let datass = this.datasoucedata[i];

            let datas = {
              comment_datetime: datass.user_details.comment_datetime,
              comment_from_customer_country_code:
                datass.user_details.comment_from_customer_country_code,

              comment_from_customer_id:
                datass.user_details.comment_from_customer_id,

              comment_from_customer_name:
                datass.user_details.comment_from_customer_name,

              comment_from_user_category_name:
                datass.user_details.comment_from_user_category_name,

              comment_from_user_id: datass.user_details.comment_from_user_id,

              comment_from_user_name:
                datass.user_details.comment_from_user_name,

              comment_id: datass.user_details.comment_id,

              comment_text: datass.user_details.comment_text,

              is_public: datass.user_details.is_public,

              reply_from_comment_text:
                datass.user_details.reply_from_comment_text,

              reply_from_datetime: datass.user_details.reply_from_datetime,

              reply_from_entry_creator_or_collaborator_user_id:
                datass.user_details
                  .reply_from_entry_creator_or_collaborator_user_id,

              // //reply
              category_aut: datass.reply,
              customer_image_login:
                datass.user_details
                  .previous_login_image_of_the_day_ceph_object_id,

              // first_name: datass.reply.first_name,

              // last_name: datass.reply.last_name,
            };
            tableData.push(datas);
          }
          this.dataSource.data = tableData;
        }
      });
  }
  datasoucedata_1: any;
  gettabledatanew() {
    // this._spiner.open();

    this._api_service
      .gettabledatauserinserttable(
        this.country_code,
        this.customer_id,
        this.wow_assignment_id,
        this.login_id
      )
      .subscribe((res) => {

        this.datasoucedata_1 = res.data;

        // this.firstFormGroup.controls['edit'].patchValue(this.datasoucedata.user_details.reply_from_comment_tex);
        let tableData_1: any[] = [];

        if (res) {
          for (let i = 0; i < this.datasoucedata_1.length; i++) {
            let datass_1 = this.datasoucedata_1[i];

            let datas_1 = {
              comment_datetime: datass_1.user_details.comment_datetime,
              comment_from_customer_country_code:
                datass_1.user_details.comment_from_customer_country_code,

              comment_from_customer_id:
                datass_1.user_details.comment_from_customer_id,

              comment_from_customer_name:
                datass_1.user_details.comment_from_customer_name,

              comment_from_user_category_name:
                datass_1.user_details.comment_from_user_category_name,

              comment_from_user_id: datass_1.user_details.comment_from_user_id,

              comment_from_user_name:
                datass_1.user_details.comment_from_user_name,

              comment_id: datass_1.user_details.comment_id,

              comment_text: datass_1.user_details.comment_text,

              is_public: datass_1.user_details.is_public,

              reply_from_comment_text:
                datass_1.user_details.reply_from_comment_text,

              reply_from_datetime: datass_1.user_details.reply_from_datetime,

              reply_from_entry_creator_or_collaborator_user_id:
                datass_1.user_details
                  .reply_from_entry_creator_or_collaborator_user_id,

              // //reply
              category_aut: datass_1.reply,
              customer_image_login:
                datass_1.user_details
                  .previous_login_image_of_the_day_ceph_object_id,

              // first_name: datass.reply.first_name,

              // last_name: datass.reply.last_name,
            };
            tableData_1.push(datas_1);
          }
          this.dataSource.data = tableData_1;
        }
      });
  }

  mergeDataAndAssignToDataSource() {
    console.log('works');

    this.gettabledata(); // Assuming this function populates the datasoucedata array
    this.gettabledatanew(); // Assuming this function populates the datasoucedata_1 array

    // Check if both datasoucedata and datasoucedata_1 are populated
    if (this.datasoucedata && this.datasoucedata_1) {
      // Concatenate the two arrays
      const mergedData = [...this.datasoucedata, ...this.datasoucedata_1];

      // Assign the merged data to the dataSource
      this.dataSource.data = mergedData;
      console.log(mergedData, 'mer');
    }
  }
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

  addbtnenable: boolean = true;

  addyourglobalcomments() {
    this.disableglobal = true;

    let name1: any = {
      activity_Data: this.firstFormGroup.controls['firstCtrl'].value,
    };
    let name = name1.activity_Data;
    let body: any = {
      wow_assessment_id: this.wow_assesment_id,
      comment_text: name,
      comment_from_user_id: this.comment_from_user_id,
      comment_from_user_name: this.comment_from_user_name,
      comment_from_user_category_name: this.comment_from_user_category_name,
      comment_from_customer_id: this.comment_from_customer_id,
      comment_from_customer_name: this.comment_from_customer_name,
      reply_from_entry_creator_or_collaborator_user_id:
        this.reply_from_entry_creator_or_collaborator_user_id,
      reply_from_comment_text: this.reply_from_comment_text,

      customer_id: this.customer_id,
      country_code: this.country_code,
      wow_assignment_id: this.wow_assignment_id,
      login_id: this.login_id,
      wow_class_stream_reference_id: this.wow_class_stream_reference_id,
      user_category_allocation_id: this.user_category_allocation_id,
    };

    this._api_service.saveinsert(body).subscribe((res) => {
      if (res.statusCode == 201) {
        this._snackbar.success(res.message);
      } else {
        this._snackbar.error(res.message);
      }

      this.inputValue = null;
      this.gettabledata();
      // this.gettabledatanew();
    });
  }

  //* --------------------------  Public methods  --------------------------*//
  profile_user_id: any;
  profile_user_id_reply: any;
  isrowselecteduser(e: any) {
    this.profile_user_id = e.comment_from_user_id;
    this.profile_user_id_reply =
      e.reply_from_entry_creator_or_collaborator_user_id;
  }
  //* ------------------------------ Helper Function -----------------------*//
  displayedColumns: string[] = ['col', 'col1'];

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any;

  isAllSelected() {
    this.rowValue = this.selection.selected;
    const numRows = this.dataSource?.data?.length;
    return this.numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  comment_id_get_id: any;
  selectedRows: any;
  replycomment: any;
  isrowselected(e: any) {
    this.comment_id_get_id = e.comment_id;
    // this.selectedRows = e.
    this.replycomment = e.reply_from_comment_text;
  }

  comment_id_get_id_delete: any;
  isrowselecteddelete(e: any) {
    this.comment_id_get_id_delete = e.comment_id;
  }
  comment_id_get_id_first_reply: any;
  isrowselectedfirstreply(e: any) {
    this.comment_id_get_id_first_reply = e.comment_id;
  }
  allglobalid: any[] = [];
  result: any;
  ispulic: any;
  globladisable: boolean = false;
  privatedisable: boolean = false;
  comment_id_get_radio: any;
  isButtonDisabled = false;

  disableButton() {
    this.isButtonDisabled = true;
  }
  select(e: any) {
    this.isButtonDisabled = false;
    this.ispulic = e.is_public;
    this.comment_id_get_radio = e.comment_id;
  }
  makeglobal() {
    let body: any = {
      comment_id_get: this.comment_id_get_radio,
      customer_id: this.customer_id,
      country_code: this.country_code,
      wow_assignment_id: this.wow_assignment_id,
      login_id: this.login_id,
      wow_class_stream_reference_id: this.wow_class_stream_reference_id,
      user_category_allocation_id: this.user_category_allocation_id,
    };

    this.globladisable = true;

    this._api_service.updatemakeglobal(body).subscribe((res) => {
      if (res.statusCode == 200) {
        this._snackbar.success(res.message);
      } else {
        this._snackbar.error(res.message);
      }

      this.gettabledata();
      // this.gettabledatanew();
    });
  }
  makeprivate() {
    let body: any = {
      comment_id_get: this.comment_id_get_radio,
      customer_id: this.customer_id,
      country_code: this.country_code,
      wow_assignment_id: this.wow_assignment_id,
      login_id: this.login_id,
      wow_class_stream_reference_id: this.wow_class_stream_reference_id,
      user_category_allocation_id: this.user_category_allocation_id,
    };
    this.privatedisable = true;
    this._api_service.updatemakeprivate(body).subscribe((res) => {
      if (res.statusCode == 200) {
        this._snackbar.success(res.message);
      } else {
        this._snackbar.error(res.message);
      }

      this.gettabledata();
      // this.gettabledatanew();
    });
  }

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
  disableglobal_reply: boolean = true;
  type1(e: any) {
    if (e.length > 0) {
      this.disableglobal_reply = false;
    } else {
      this.disableglobal_reply = true;
    }
  }
  replay(data: any) {
    let value = data.value;
    this.isEditModeOn = true;
    this.isEditMode = false;

    let body1: any = {
      reply_from_comment_text: this.replytype,
      comment_id_get: this.comment_id_get_id_first_reply,
      reply_from_entry_creator_or_collaborator_user_id:
        this.reply_from_entry_creator_or_collaborator_user_id,

      customer_id: this.customer_id,
      country_code: this.country_code,
      wow_assignment_id: this.wow_assignment_id,
      login_id: this.login_id,
      wow_class_stream_reference_id: this.wow_class_stream_reference_id,
      user_category_allocation_id: this.user_category_allocation_id,
    };

    this._api_service.updatereply(body1).subscribe((res) => {
      this.gettabledata();
      // this.gettabledatanew();
    });
  }
  deletecomments() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      minWidth: '360px',
      minHeight: 'calc(100vh - 800px)',
      // data: this.rowvalues,
    });

    let body: any = {
      comment_id_get: this.comment_id_get_id_delete,
      customer_id: this.customer_id,
      country_code: this.country_code,
      wow_assignment_id: this.wow_assignment_id,
      login_id: this.login_id,
      wow_class_stream_reference_id: this.wow_class_stream_reference_id,
      user_category_allocation_id: this.user_category_allocation_id,
    };

    dialogRef.afterClosed().subscribe((res) => {
      if (res == 1) {
        this._api_service.deletecomments(body).subscribe((res) => {
          if (res.statusCode == 200) {
            this._snackbar.success(res.message);
          } else {
            this._snackbar.error(res.message);
          }
          this.gettabledata();
          // this.gettabledatanew();
        });
      }
    });
  }

  updatecomments(data: any) {
    let value = data.value;
    this.isEditModeOn = true;
    this.isEditMode = false;
    this.name = '';
    let body1: any = {
      reply_from_comment_text: this.firstFormGroup.controls['edit'].value,
      comment_id_get: this.comment_id_get_id,
      customer_id: this.customer_id,
      country_code: this.country_code,
      wow_assignment_id: this.wow_assignment_id,
      login_id: this.login_id,
      wow_class_stream_reference_id: this.wow_class_stream_reference_id,
      user_category_allocation_id: this.user_category_allocation_id,
    };
    this._api_service.updatecomments(body1).subscribe((res) => {
      this.gettabledata();
    // this.gettabledatanew();
    });
  }
  ngDoCheck(): void {}

  value!: string;
  isEditMode = false;
  reply_date: any;

  editField(e: any) {
    this.reply_date = e.reply_from_comment_text;
    this.name = this.reply_date;
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
  openUserProfile() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      minHeight: 'auto',
      width: '320px',

      data: {
        user_id: this.user_imge_id,
        customer_id: this.customer_id,
        country_id: this.country_code,
      },
    };
    const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }
  openUserProfile1() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      minHeight: 'auto',
      width: '320px',

      data: {
        user_id: this.user_imge_idd,
        customer_id: this.customer_id,
        country_id: this.country_code,
      },
    };
    const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }
  user_imge_id: any;
  isrowse(e: any) {
    this.user_imge_id = e.reply_from_entry_creator_or_collaborator_user_id;
  }
  user_imge_idd: any;
  isrowsel(e: any) {
    this.user_imge_idd = e.comment_from_user_id;
  }
  //! -------------------------------  End  --------------------------------!//
}
