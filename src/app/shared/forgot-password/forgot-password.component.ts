import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private uservice: UserService,public router:Router) { }
  forgotform: FormGroup
  otpblock:boolean
  fields:boolean

  ngOnInit(): void {
    this.forgotform=new FormGroup({
      email:new FormControl(),
      otp:new FormControl(),
      password:new FormControl(),
      cpassword:new FormControl()
    })

  }

  otp(){
    this.otpblock=true
    this.fields=false
    this.uservice.forgotopt(this.forgotform.value.email).subscribe((x)=>{
      sessionStorage.setItem("value",btoa(x.toString()))
    })
  }

  verifyotp(){
    if(this.forgotform.value.otp===atob(sessionStorage.getItem("value"))){
      this.fields=true
    }
  }

  submit(){
    if(this.forgotform.value.password===this.forgotform.value.cpassword){
      this.uservice.changepass(this.forgotform.value.email,this.forgotform.value.password).subscribe((x)=>{

      })
    }
    else{
      alert("password and confirm password do not match")
    }
  }

}
