import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss'],
})
export class DeleteConfirmDialogComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  globalnotification: any;
  globalid:any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public _dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    console.log(this.data);
    // this.globalnotification = this.data.notification_id;
    // // console.log(this.globalnotification);


    // for (let i = 0; i < this.globalnotification.length; i++) {
    //   const element = this.globalnotification[i];
    //   // console.log(element.global_notification_id);
    //   this.globalid = element.global_notification_id
    //   console.log(this.globalid);




    // }
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  deletenotificationid() {
    // console.log(this.globalnotification);
  }

  delete(res: any) {
    this._dialogRef.close(res);
  }
  cancel(res: any) {
    this._dialogRef.close(res);
  }
  //* --------------------------  Public methods  --------------------------*//
  onNoClick(): void {
    this._dialogRef.close();
  }
  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
