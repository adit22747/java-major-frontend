import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  courses: any
  videoForm!: FormGroup;
  url: any;
  path: any;
  videoList:any;
  number:any;
  @ViewChild('Option')
  option!: ElementRef;
  constructor(private as: AdminService,private router:Router) { 
    this.number = Array(0).fill(0).map((x,i)=>i);
  }
  ngOnInit(): void {
    this.videoForm = new FormGroup({
      courseId: new FormControl('', [Validators.required]),
      position: new FormControl(''),
     videoName: new FormControl('', [Validators.required, Validators.minLength(5)]),
     videoDesc: new FormControl('', [Validators.required, Validators.minLength(10)]),
     videoPath:new FormControl('', [Validators.required])
  })
  this.as.getCourses()
  .subscribe((data)=>{
    this.courses=data;
 
  },
  (err)=>{
  });
}
addVideo(){
   //remove fakepath from image url
    //ASSUMPTION: SELECT IMAGE FROM ASSETS ONLY!
    this.path=this.videoForm.value.videoPath
    this.videoForm.value.videoPath = this.path.replace(/^.*\\/, "")
  this.as.addVideo(this.videoForm.value.videoName, this.videoForm.value.videoDesc,this.videoForm.value.videoPath,  this.videoForm.value.courseId, this.videoForm.value.position).subscribe((data)=>{
    this.router.navigate(['/videos'])
  })
}
selectedCourse(courseId: any,index:any){
 
}
setPosition(videoId:any){
}
setVideos(event: any){

 this.number = Array(this.courses[event.target.value[0]].videosize).fill(0).map((x,i)=>i);
}
readUrl(event:any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      this.url = (<FileReader>event.target).result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
}
}