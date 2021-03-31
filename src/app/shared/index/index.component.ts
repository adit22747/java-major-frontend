  
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/authenticate.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  userrole

  constructor(private router: Router,private as:AuthenticateService, public dialog : MatDialog) { }

  ngOnInit(): void {
    
    this.userrole=sessionStorage.getItem("userrole")
    if(sessionStorage.getItem("userrole") === "admin" || "prime"){
      this.router.navigate(['/admin'])
    }
    if(sessionStorage.getItem("userrole")==="user"){
      this.router.navigate(['/user'])
    }
    this.router.navigate(['/'])
  }
  
  reg(){
    if(sessionStorage.getItem("userrole") === "admin" || "prime"){
      this.router.navigate(['/admin'])
    }
    if(sessionStorage.getItem("userrole")==="user"){
      this.router.navigate(['/user'])
    }
    if(sessionStorage.getItem("userrole") === null){
      this.dialog.open(RegisterComponent, {
        width: '800px',
      });
    }
  }

}