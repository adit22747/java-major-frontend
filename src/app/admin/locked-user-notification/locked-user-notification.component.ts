import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import {  MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-locked-user-notification',
  templateUrl: './locked-user-notification.component.html',
  styleUrls: ['./locked-user-notification.component.scss']
})
export class LockedUserNotificationComponent implements OnInit {
  users: any

  searchInput!: string
  userBySearch: any;
  

  constructor(private as: AdminService, private router: Router, public dialog: MatDialog) {
  
   }

  ngOnInit(): void {
    
    this.getLocalUsers()
  }
  searchUsers(uname: String) {

  
      this.userBySearch = this.users.filter((user: any) => user.username.toLowerCase().includes(uname));
    
  }

  unlockUser(id:number){
   
    let dialogref=  this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: {id:id}
    });
    dialogref.afterClosed().subscribe((result)=>{
      if(result!=undefined && result!=null && result==true)
      {
        this.as.unlockUserById(id).subscribe((data:any)=>{
            this.getLocalUsers()
            this.as.updateCartSizeData()
        }, (err)=>{
        });
      }
    })
  }

  getLocalUsers(){
    this.as.getUsers().subscribe((data) => {
      this.users = data;
      this.userBySearch = this.users;

    },
      (err) => {

      })
  }


}
