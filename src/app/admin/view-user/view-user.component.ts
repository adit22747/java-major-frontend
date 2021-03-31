import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  users!: any;
  //search=""
  pageEvent!:PageEvent;
  searchInput!: string
  userBySearch: any;
  filteredArray: any[] = []
  defaultRecords: any = 5;

  constructor(private as: AdminService, private router: Router) {
   
    
    
   }
  
  ngOnInit(): void {

    this.as.getUsers().subscribe((data) => {
      this.users = data;
      
      this.defprint()
    },
      (err) => {

      })



  }
  
  
defprint(){
  this.filteredArray = this.users.slice(0, this.defaultRecords);

}


  getUser(event: any) {
  
    this.userBySearch = this.users.filter((x: any) => { return x.users == event });
   


  }


  onPaginateChange(data: any) {
  
    this.filteredArray = this.users.slice(((data.pageSize)*data.pageIndex), (data.pageIndex+1)*data.pageSize);
  }
}