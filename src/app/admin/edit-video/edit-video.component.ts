import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertmodelComponent } from 'src/app/usermodule/alertmodel/alertmodel.component';
@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  id: any
  editVideoForm!: FormGroup;
  videoById: any
  video_name: any
  courses: any
  videos: any
  course_name: any
  url!: string | ArrayBuffer | null;
  path: any;
  oldPath: any;
  constructor(private as: AdminService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }
  ngOnInit(): void {
    //Get ID from View-Video
    this.id = atob(this.route.snapshot.params['id'])
    //Get Videos by ID
    this.as.getVideoById(this.id).subscribe((data) => {
      this.as.getCourses().subscribe((data1) => {
        this.courses = data1
        this.course_name = this.courses.filter((x: any) => { return x.courseName == this.videoById.courseName })
        this.course_name = this.course_name[0].courseId
      },
        error => {
          this.dialog.open(AlertmodelComponent, {
            data: { value: error }
          });
        }
      );
      this.videoById = data;
      this.editVideoForm = new FormGroup({
        videoId: new FormControl(this.videoById.videoId),
        videoName: new FormControl(this.videoById.videoName, [Validators.required, Validators.minLength(5)]),
        videoDesc: new FormControl(this.videoById.videoDesc, [Validators.required, Validators.minLength(10)]),
        courseId: new FormControl({ value: this.videoById.courseName, disabled: true }),
        courseName: new FormControl(this.course_name),
        oldvideoPath: new FormControl({ value: this.videoById.videoPath, disabled: true }),
        videoPath: new FormControl('')
      })
      this.oldPath = this.videoById.videoPath
    },
      error => {
        this.dialog.open(AlertmodelComponent, {
          data: { value: error }
        });
      }
    );
  }
  //Function for updating video
  updateVideo() {
    //remove fakepath from image url
    //ASSUMPTION: SELECT IMAGE FROM ASSETS ONLY!
    if (this.editVideoForm.value.videoPath === "") {
      this.path = this.oldPath
    }
    else {
      this.path = this.editVideoForm.value.videoPath
      this.path = this.path.replace(/^.*\\/, "")
    }
    this.as.editVideo(this.editVideoForm.value.videoId, this.editVideoForm.value.videoName, this.editVideoForm.value.videoDesc, this.path, this.course_name).subscribe((data) => {
      this.as.getVideos().subscribe((data) => {
        this.videos = data;
        this.dialog.open(AlertmodelComponent, {
          data: { value: "Successfully Updated Video" }
        });
        this.router.navigate(['/videos'])
      })
    },
      error => {
        this.dialog.open(AlertmodelComponent, {
          data: { value: error }
        });
      }
    );
  }
  //Function to set video preview
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