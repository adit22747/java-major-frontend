import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-changed-password-login',
  templateUrl: './changed-password-login.component.html',
  styleUrls: ['./changed-password-login.component.scss']
})
export class ChangedPasswordLoginComponent implements OnInit {

  constructor(public dialog : MatDialog, public dialogRef:MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

  reg(){
    this.dialog.open(RegisterComponent,{
      width: '800px',
    });
    this.dialogRef.close();
  }

}