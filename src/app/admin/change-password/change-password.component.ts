 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { AuthenticateService } from 'src/app/authenticate.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private route:Router,private aservice:AdminService,private as:AuthenticateService) { }
  changePWd
  notmatch

  ngOnInit(): void {
  }
  changePwd(changePwdForm){
    if(changePwdForm.value.pwd===changePwdForm.value.npwd && changePwdForm.value.pwd!=""){
     this.aservice.changePaasword(changePwdForm.value.option,changePwdForm.value.pwd).subscribe((x)=>{
           this.as.logout()
           this.route.navigate(["/"])
     })
    }
    else{
      this.notmatch=true
    }
    

  }
}
