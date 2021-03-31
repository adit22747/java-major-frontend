import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  categories: any
  courses: any
  total_cat:any
  total_cou:any
  total_user:any
  username: any
  userrole:any

  constructor(private as: AdminService) { 
  
  }
  
  
  ngOnInit(): void {
    this.userrole=sessionStorage.getItem("userrole")

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    this.username=sessionStorage.getItem("username")

    this.as.getCategories()
    .subscribe((data)=>{
      
      
      this.categories=data;
      
    },
    (err)=>{
      
    });


    this.as.getCourses()
    .subscribe((data)=>{
   
      
      this.courses=data;
      
      
    },
    (err)=>{
      
    });



    //count of categories  
    this.as.getCategoriesCount()
    .subscribe((data)=>{
      
      
      this.total_cat=data;
     
      
    },
    (err)=>{
      
    });

    
    //count of courses
    this.as.getCourseCount()
    .subscribe((data)=>{
      
      
      this.total_cou=data;
   
      
    },
    (err)=>{
      
    });



    //count of users
    this.as.getUserCount()
    .subscribe((data)=>{
      
      
      this.total_user=data;
     
      
    },
    (err)=>{
      
    });
    
  
  

    
  }

}
