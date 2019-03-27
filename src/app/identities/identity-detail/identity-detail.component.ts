import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Identity} from '../identity/identity';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DeleteIdentityDialogComponent} from '../delete-identity-dialog/delete-identity-dialog.component';

@Component({
  selector: 'app-identity-detail',
  templateUrl: './identity-detail.component.html',
  styleUrls: ['./identity-detail.component.css']
})
export class IdentityDetailComponent implements OnInit {

  identity: Identity;
  backButton: String = 'Back';
  editButton: String = 'Edit';
  deleteButton: String = 'Delete';
  somevalue: String;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        identity => {
          this.identity = identity['identity'];
        }
      );
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id : this.identity};
    const dialogRef = this.dialog.open(DeleteIdentityDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        this.somevalue = result;
        console.log(this.somevalue);
      });
  }

}
