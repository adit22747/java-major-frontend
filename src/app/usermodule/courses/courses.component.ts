import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

courses:any

  constructor(private router: Router,private us:UserService) { }

  ngOnInit(): void {
    //get courses
    this.us.getCourses().subscribe((data)=>{
      this.courses=data
    })
  }

  view(courseid:any){
    this.router.navigate(['/coursedetail'],{queryParams:{courseid:btoa(courseid)}})
  }

}
