import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.scss']
})
export class ViewVideoComponent implements OnInit {

  videos: Array<any> = []
  videoByCourse: Array<any> = [];
  courses: any
  courseName: any
  videosByCourseCount: any
  deletedResult: any
  videoSorted: any;
  constructor(private as: AdminService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.as.getCourses()
      .subscribe((data) => {
        this.courses = data

      },
        (err) => {

        });

    this.getLocalVideos();

  }

  getVideosByCourse(uniqueCourse: any) {
    if (uniqueCourse != null) {

      this.videoSorted = this.videos.filter((x: any) => { return x.courseName == uniqueCourse });
      this.videosByCourseCount = this.videoSorted.length

      if (this.videoByCourse.length != 0) {
        this.courseName = this.videoSorted[0].courseName
      }
      else {
        this.courseName = "No videos in given course"
      }

    }
  }

  editVideo(id: any) {
    return this.router.navigate(['/edit-video/', btoa(id)])
  }

  deleteVideo(id: number) {
    let dialogref = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { id: id }
    });
    dialogref.afterClosed().subscribe((result: boolean | null | undefined) => {
      if (result != undefined && result != null && result == true) {
        this.deletedResult = result;
        this.as.deleteVideo(id).subscribe((data) => {
          this.getLocalVideos();
          this.router.navigate(['/videos'])

        }
        )

      }
    })

  }
  getLocalVideos() {
    this.as.getVideos()
      .subscribe((data) => {

        this.videos = data;
        this.videoByCourse = this.videos;
        this.videoSorted = this.videoByCourse.sort((a: any,b:any) => { return a.srNo - b.srNo });


      },
        (err) => {

        });
  }


}
