import { Component, Renderer2, ElementRef, OnInit, ViewChild, AfterViewInit, Directive } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertmodelComponent } from 'src/app/usermodule/alertmodel/alertmodel.component';
@Directive({ selector: 'HTMLElement' })
class HTMLElement {
}
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  id: any
  courseById: any
  editCourseForm!: FormGroup;
  categoryById: any
  cat_name: any
  categories: any
  courses: any
  oldLogo: any
  url!: string | ArrayBuffer | null;
  path: any;
  constructor(private as: AdminService, private router: Router, private route: ActivatedRoute, private renderer: Renderer2, public dialog: MatDialog) { }
  ngOnInit(): void {
    //Get ID from View-Course
    this.id = atob(this.route.snapshot.params['id']);
    //Get Courses by ID
    this.as.getCourseById(this.id).subscribe((data) => {
      this.as.getCategories().subscribe((data1) => {
        this.categories = data1
        this.cat_name = this.categories.filter((x: any) => { return x.categoryName == this.courseById.category })
        this.cat_name = this.cat_name[0].categoryId
      },
        error => {
          this.dialog.open(AlertmodelComponent, {
            data: { value: error }
          });
        }
      );
      this.courseById = data;
      this.editCourseForm = new FormGroup({
        courseId: new FormControl(this.courseById.courseId),
        courseName: new FormControl(this.courseById.courseName),
        courseDesc: new FormControl(this.courseById.courseDesc),
        coursePrice: new FormControl(this.courseById.coursePrice),
        likes: new FormControl(this.courseById.likes),
        categoryId: new FormControl({ value: this.courseById.category, disabled: true }),
        categoryName: new FormControl(this.cat_name),
        oldcourseLogo: new FormControl({ value: this.courseById.courseLogo, disabled: true }),
        courseLogo: new FormControl('')
      })
      this.oldLogo = this.courseById.courseLogo
    },
      error => {
        this.dialog.open(AlertmodelComponent, {
          data: { value: error }
        });
      }
    );
  }
  //Function for updating course
  updateCourse() {
    //remove fakepath from image url
    //ASSUMPTION: SELECT IMAGE FROM ASSETS ONLY!
    if (this.editCourseForm.value.courseLogo === "") {
      this.path = this.oldLogo
    }
    else {
      this.path = this.editCourseForm.value.courseLogo
      this.path = this.path.replace(/^.*\\/, "")
    }
    this.as.editCourse(this.editCourseForm.value.courseId, this.editCourseForm.value.courseName, this.editCourseForm.value.courseDesc, this.path, this.editCourseForm.value.coursePrice, this.editCourseForm.value.likes, this.cat_name).subscribe((data) => {
      this.as.getCourses().subscribe((data) => {
        this.courses = data;
        this.dialog.open(AlertmodelComponent, {
          data: { value: "Successfully Updated Course" }
        });
        this.router.navigate(['/courses_admin'])
      })
    },
      error => {
        this.dialog.open(AlertmodelComponent, {
          data: { value: error }
        });
      }
    );
  }
  //Function to set image preview
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}