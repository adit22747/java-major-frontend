import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {

  categories: any
  courses: any
  coursesByCat: Array<any> = []
  coursesByCatCount: any

  catName: any

  search = ""

  constructor(private as: AdminService, private router: Router, public dialog: MatDialog) {
  }


  ngOnInit(): void {

    this.as.getCategories()
      .subscribe((data) => {
        this.categories = data;
    

      },
        (err) => {

        });

    this.getLocalCourses()



  }

  getCategory(event: any) {
  }

  getCoursesByCat(uniqueCat: any) {

   
    this.coursesByCat = this.courses.filter((x: any) => { return x.category == uniqueCat });
    

    this.coursesByCatCount = this.coursesByCat.length;
    if (this.coursesByCat.length == 0) {
      this.catName = "No course in given category"
    }

    this.catName = this.coursesByCat[0].category
  }

  editCourse(id: any) {

    return this.router.navigate(['/edit-course/', btoa(id)])

  }

  deleteCourse(id: number) {
    let dialogref = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { id: id }
    });
    dialogref.afterClosed().subscribe((result: boolean | null | undefined) => {
      if (result != undefined && result != null && result == true) {
        this.as.deleteCourse(id).subscribe((data) => {
          this.getLocalCourses();
          this.router.navigate(['/courses_admin'])

        })
      }
    })
  }


  getLocalCourses() {
    this.as.getCourses()
      .subscribe((data) => {


        this.courses = data;
        this.coursesByCat = this.courses;
     

      },
        (err) => {

        });
  }






}
