import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  users: Array<any>=[];
 
  len!: number
  len1!: number;

  constructor(private as: AdminService,private router:Router) {
    this.as.updateCartSizeData()
    this.as.lenupdate.subscribe((data: any)=>{
      this.len=data
      this.len1=data
      
    })
   }

  ngOnInit(): void {
    this.as.getLockedUsers().subscribe((data) => {
      this.users = data;
  
      this.len=Object.keys(this.users).length;
    
      
    
    },
      (err) => {
   

      })

  }

}
