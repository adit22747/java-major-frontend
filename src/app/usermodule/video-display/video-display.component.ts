import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertmodelComponent } from '../alertmodel/alertmodel.component';
@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.scss']
})
export class VideoDisplayComponent implements OnInit {
  form: FormGroup;
  courseid: number;
  userid = Number(sessionStorage.getItem("userId"));
  videoList: any
  videourl: any
  videoId: any
  isCompleted: any
  certipath: any
  tempvideo: any
  isCertiPath: any
  videoStatus: any
  courseTitle : any
  @ViewChild('video') video;
  constructor(private formBuilder: FormBuilder, private us: UserService, private ar: ActivatedRoute, private router: Router, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rating: new FormControl(""),
      feedback: new FormControl("")
    });
    //courseid fetch value
    this.ar.queryParams.subscribe((p) => {
      this.courseid = Number(atob(p['courseid']))
    })
    this.us.getVideoStatus(this.userid, this.courseid).subscribe((x) => {
      this.videoStatus = x
      
      
    })
    this.us.completedcourse(this.courseid, this.userid)
      .subscribe((data) => {
        this.isCompleted = data
      })
    //get videos
    this.us.getVideoslist(this.courseid, this.userid)
      .subscribe((data) => {
        this.videoList = data;
        this.courseTitle = this.videoList[0].courseName;
      },
        (err) => {
        });
  }
  fetch(path, videoid) {
    this.ngAfterViewInit()
    this.us.nextVideo(this.courseid, this.userid, videoid).subscribe((x) => {
      if (x || this.isCompleted) {
        this.videourl = path
        this.videoId = videoid
      }
      else {
        this.dialog.open(AlertmodelComponent, {
          data: { value: "You need to complete previous video" }
        });
      }
    });
  }
  doubleplayback() {
    // element.nativeElement.shadowRoot.querySelector('#video')
    this.video.nativeElement.playbackRate = 2;
  }
  doublepreviousplay(){
    this.video.nativeElement.playbackRate = 0.5;
  }
  normalplayback(){
    this.video.nativeElement.playbackRate = 1;
  }
  ngAfterViewInit() {
    let a = setInterval(() => {
      if (this.tempvideo) {
        clearInterval(a);
       if(!this.isCompleted){
        this.us.completeVideo(this.courseid, this.userid, this.videoId).subscribe((x) => {
          this.isCompleted = x;
          this.ngOnInit();
          if (this.isCompleted) {
            this.dialog.open(AlertmodelComponent, {
              data: { value: "Congratulations !!! You have successfully completed this course!" }
            });
          }
          this.tempvideo = false
        })
        }
      }
      this.tempvideo = this.video.nativeElement.ended
    }, 1000);
  }
  completion(){
  }
  addFed() {
    if (this.isCompleted) {
      this.us.addFeedback(this.userid, this.courseid, this.form.value.feedback, this.form.value.rating)
        .subscribe({
          next: () => {
            // this.router.navigate(['/coursedetail'], { queryParams: { courseid: btoa(String(this.courseid)) } })
          }
        })
    } else {
      this.dialog.open(AlertmodelComponent, {
        data: { value: "Please complete all the videos to give feedback" }
      });
    }
  }
  gencer() {
    if (this.isCompleted) {
      this.us.generatepdf(this.courseid, this.userid)
        .subscribe((x) => {
          this.us.getcerti(this.userid, this.courseid).subscribe((x) => {
            this.certipath = x
            this.isCertiPath = true
          })
        })
    }
    else {
      this.dialog.open(AlertmodelComponent, {
        data: { value: "Please complete the videos to generate certificate" }
      });
    }
  }
}