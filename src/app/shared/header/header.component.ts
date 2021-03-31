import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { DialogBoxComponent } from 'src/app/admin/dialog-box/dialog-box.component';
import { AuthenticateService } from 'src/app/authenticate.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


username: any
 userrole:Observable<String>
  len: any;
  len1: any;
  constructor(private as:AuthenticateService,private admins:AdminService , private route:Router,public dialog: MatDialog) {
    this.userrole=this.as.userrole
    
    
  // if(history.state != null){
  //   if(history.state.data === "user"){
  //     this.ngOnInit()
      
  //      this.route.navigate(['/user'])
  //   }
  //   else if(history.state.data === ("admin" || "prime")){
  //     this.ngOnInit()
    
  //      this.route.navigate(['/admin'])
  //   }
  // }
  // else{
  //   this.route.navigate(['/'])
  // }


  this.admins.updateCartSizeData()
  this.admins.lenupdate.subscribe((data: any)=>{
    this.len=data
    this.len1=data
    
  })
   }

  ngOnInit(): void {
    this.username=sessionStorage.getItem("username")
   
  }

  reg(){
    this.dialog.open(RegisterComponent,{
      width: '800px',
    });
  }

  logout(){
    this.as.logout()
    this.route.navigate(["/"])
  }

  delete(){
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(() => {
      
    })

  }

}
