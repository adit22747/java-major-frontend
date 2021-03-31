import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/authenticate.service';
import { UserService } from 'src/app/user.service';
import { AlertmodelComponent } from '../alertmodel/alertmodel.component';
import { UpdatecommentComponent } from '../updatecomment/updatecomment.component';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  form: FormGroup;
  feedbackcount: number;
  commentcount: number;
  courses: any;
  videos: any;
  value: Observable<number>;
  feedbacks: any;
  comments: any
  rating3: number;
  addComment: FormGroup
  courseid: number;
  islike: any;
  isenrolled: any;
  isProfileCreated: any;
  isFeedbackGiven:any;
  isFinished: any;
  username = sessionStorage.getItem("username")
  buttoncomment: boolean[] = []
  availablevideo : any
  nameInit: any
  // index=0
  userid = Number(sessionStorage.getItem("userId"))
  constructor(private formBuilder: FormBuilder, private us: UserService, private ar: ActivatedRoute, private router: Router, private as: AuthenticateService,
    private formbuilder: FormBuilder, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    //courseid fetch value
    this.ar.queryParams.subscribe((p) => {
      this.courseid = Number(atob(p['courseid']))
    })
    //get likes
    this.us.getlike(this.courseid, this.userid).subscribe((data) => {
      this.islike = data
    })
    this.us.isProfileCreated(this.userid).subscribe((x) => {
      this.isProfileCreated = x
    })
    this.us.completedcourse(this.courseid, this.userid)
      .subscribe((data) => {
        this.isFinished = data
      })
    //get enrollement
    this.us.getEnrollement(this.courseid, this.userid).subscribe((data) => {
      this.isenrolled = data
    })
    //get course by id
    this.us.getCoursById(this.courseid).subscribe((data) => {
      this.courses = data
      if(this.courses.videosize === 0){
        this.availablevideo=false
      }
      else this.availablevideo=true
    })
    //get total number of feedbacks
    this.us.getFeedbackcount(this.courseid).subscribe((data) => {
      this.feedbackcount = data
    })
    //get total number of comments
    this.us.getCommentcount(this.courseid).subscribe((data) => {
      this.commentcount = data
    })
    this.form = this.formBuilder.group({
      rating: [3],
      feedback: new FormControl("")
    });
    this.value = this.form.controls.rating.valueChanges;
    //get comments
    this.us.getComment(this.courseid).subscribe((data) => {
      this.comments = data
      this.nameInit = this.comments[0].user
    })
    //get videos
    this.us.getVideos(this.courseid).subscribe((data) => {
      this.videos = data
    })
    //get feedbacks
    this.us.getFeedback(this.courseid).subscribe((data) => {
      this.feedbacks = data
    })
    //is feedback given
    this.us.isFeedbackGiven(this.userid,this.courseid).subscribe((x)=>{
      this.isFeedbackGiven=x
    })
    //add comments
    this.addComment = new FormGroup({
      // userId: new FormControl(this.addComment.value.userId),
      // courseId: new FormControl(this.addComment.value.courseId),
      comment: new FormControl(""),
    })
  }
  submit() {
  }
  addCom(addComment) {
    this.us.addComment(this.userid, this.courseid, addComment.value.comment)
      .subscribe({
        next: () => {
          this.ngOnInit()
        }
      })
  }
  addFed() {
    this.us.addFeedback(this.userid, this.courseid, this.form.value.feedback, this.form.value.rating)
      .subscribe({
        next: () => {
          this.closebutton.nativeElement.click();
          this.ngOnInit()
        }
      })
  }
  //add like
  addlike() {
    if (this.islike) {
      this.us.addlikes(this.courseid, this.userid)
        .subscribe({
          next: () => {
            this.islike = true
            this.ngOnInit()
          },
          error: () => {
         
            // this.islike = true
            // this.ngOnInit()
          }
        })
    }
    if (this.islike) {
      this.us.removelikes(this.courseid, this.userid)
        .subscribe({
          next: () => {
            this.ngOnInit()
          }
        })
    }
  }
  //add enrollement
  enroll() {
    if (this.isProfileCreated) {
      this.us.addEnrollement(this.courseid, this.userid)
        .subscribe({
          next: () => {
            this.dialog.open(AlertmodelComponent, {
              data: { value: "you need to pay INR"+this.courses.coursePrice }
            });
            this.ngOnInit()
          }
        })
    }
    else {
      this.dialog.open(AlertmodelComponent, {
        data: { value: "you need to create profile first. Please click on USER OPTIONS" }
      });
    }
  }
  //go to video list
  video(courseid) {
    this.router.navigate(['/videolist'], { queryParams: { courseid: btoa(courseid) } })
  }
  //deletecomment
  deletecomment(commentid) {
    this.us.deletecomment(commentid).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }
  //updatecomment
  updatecomment(commentid, comment_msg) {
    const dialogRef = this.dialog.open(UpdatecommentComponent, {
      width: '250px',
      data: {
        courid: this.courseid,
        useid: this.userid,
        comm: commentid,
        comment_msg: comment_msg,
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit()
    });
  }
}