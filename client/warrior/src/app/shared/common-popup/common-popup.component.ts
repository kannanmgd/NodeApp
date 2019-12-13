import { Component, OnInit, OnDestroy, Optional, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-common-popup',
  templateUrl: './common-popup.component.html',
  styleUrls: ['./common-popup.component.scss']
})
export class CommonPopupComponent implements OnInit, OnDestroy {
  @Input() msgResponse: any;

  stepperMsg: any;

  constructor(
    public http: HttpClient,
    @Optional() public dialogRef: MatDialogRef<CommonPopupComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public popupResponse: any
    ) { }

  ngOnInit() {
    this.stepperMsg = '';
    // this.loadJson();
    if (this.msgResponse) {
      this.stepperMsg = this.msgResponse;
    } else {
      this.stepperMsg = this.popupResponse;
    }
  }

  onErrorActionCallback(data) {
      this.dialog.closeAll();
  }

  onClose() {
    this.dialog.closeAll();
  }





  ngOnDestroy() {
  }

}
