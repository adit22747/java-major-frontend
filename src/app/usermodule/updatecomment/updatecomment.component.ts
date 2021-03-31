import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-updatecomment',
  templateUrl: './updatecomment.component.html',
  styleUrls: ['./updatecomment.component.scss']
})
export class UpdatecommentComponent implements OnInit {

  value:any
  comment:any
  constructor(public dialogRef: MatDialogRef<UpdatecommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private us: UserService) { }

  ngOnInit(): void {
    this.comment=this.data.comment_msg
  }

  //update comment
  updatecomment(){
    this.us.updateComment(this.data.useid,this.data.courid,this.comment,this.data.comm).subscribe({
      next: () =>{
        this.dialogRef.close()
        this.ngOnInit()
      }
    })
  }

}
