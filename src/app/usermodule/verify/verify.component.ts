import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/authenticate.service';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(private us:UserService,private router:Router,private uservice: UserService,private as: AuthenticateService, public dialogRef: MatDialogRef<VerifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private formbuilder:FormBuilder,public dialog: MatDialog) { }
  verifyForm: FormGroup
 
  ngOnInit(): void {
    this.verifyForm = new FormGroup({
      otp: new FormControl()
    })

  }
  verify(){
    // this.us.verifyotp(this.verifyForm.value.otp,sessionStorage.getItem("username")).subscribe((x)=>{
    //   if(x===true){
    //     this.router.navigate(['/userhome'])
    //   }
    // })
   
    if(this.verifyForm.value.otp===atob(sessionStorage.getItem("otp"))){
      this.us.verifyotp(true,sessionStorage.getItem("username")).subscribe((x)=>{
        this.dialogRef.close();
        this.router.navigate(['/user'])
      })
     
    }
    
  }
  resendotp(){
    
  }
}
