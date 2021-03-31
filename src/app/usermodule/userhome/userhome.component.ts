import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { UserService } from 'src/app/user.service';
import { AlertmodelComponent } from '../alertmodel/alertmodel.component';
import { VerifyComponent } from '../verify/verify.component';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {
  username
  activated
  isProfileCreated
  users: Observable<any>
  categories: any;
  slides: any
  courses: any;
  progress = false
  home1 = true
  completed = false
  EcourseDates: any
  FcourseDates: any
  Certificates: any
  EnrolledCourseList: any;
  FinishedCourseList: any;
  searchInput!: string
  coursebysearch:any
  enrolledCourses:any
  finishedCourses:any
  constructor(private router: Router, private uservice: UserService, private as: AdminService, public dialog: MatDialog) {
    this.username = sessionStorage.getItem("username")
    this.uservice.isActivated(sessionStorage.getItem("userId")).subscribe((x) => {
      this.activated = x
    })
    this.uservice.isProfileCreated(sessionStorage.getItem("userId")).subscribe((x) => {
      this.isProfileCreated = x
    })
  }
  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    // get cetegories
    this.uservice.getECourses(sessionStorage.getItem("userId")).subscribe((x) => {
      this.EnrolledCourseList = x;
      if(this.EnrolledCourseList.length === 0){
        this.enrolledCourses = true
      }
      else this.enrolledCourses = false
    })
    this.uservice.getFCourses(sessionStorage.getItem("userId")).subscribe((x) => {
      this.FinishedCourseList = x
      if(this.FinishedCourseList.length === 0){
        this.finishedCourses = true
      }
      else this.finishedCourses = false
    })
    this.uservice.getEdates(sessionStorage.getItem("userId")).subscribe((X) => {
      this.EcourseDates = X
    })
    this.uservice.getFdates(sessionStorage.getItem("userId")).subscribe((x) => {
      this.FcourseDates = x
    })
    this.uservice.getCerties(sessionStorage.getItem("userId")).subscribe((x) => {
      this.Certificates = x
    })
    this.as.getCategories()
      .subscribe((data) => {
        this.categories = data;
        this.slides = this.chunk(this.categories, 3);
      },
        (err) => {
        });
    //get courses
    //get courses
    this.uservice.getCourses().subscribe((data) => {
      this.courses = data
      this.coursebysearch = data
    })
  }
  sendotp() {
    this.dialog.open(VerifyComponent, {
      width: '800px',
    });
    this.uservice.sendregotp(sessionStorage.getItem('userId')).subscribe((x) => {
      sessionStorage.setItem("otp", btoa(x))
    }
    )
  }
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  view(courseid: any) {
    if (this.activated) {
      this.router.navigate(['/coursedetail'], { queryParams: { courseid: btoa(courseid) } })
    }
    else {
      this.dialog.open(AlertmodelComponent, {
        data: { value: "You need to Verify your account First" }
      });
    }
  }
  home() {
    this.home1 = true
    this.progress = false
    this.completed = false
  }
  pro() {
    this.home1 = false
    this.progress = true
    this.completed = false
  }
  comp() {
    this.home1 = false
    this.progress = false
    this.completed = true
  }
  sendcerti(courseid) {
    this.uservice.mailcerti(sessionStorage.getItem("userId"), courseid).subscribe((x) => {
    })
  }
  searchCourses(uname: String){
    this.coursebysearch = this.courses.filter((x:any)=>x.courseName.toLowerCase().includes(uname));
  } 
  courbycat(categoryid:number){
    this.uservice.getcoursesbycat(categoryid).subscribe((x)=>{
      this.coursebysearch=x;
    })
  }
  allcourse(){
    this.coursebysearch=this.courses
  }
}