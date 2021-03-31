import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-alertmodel',
  templateUrl: './alertmodel.component.html',
  styleUrls: ['./alertmodel.component.scss']
})
export class AlertmodelComponent implements OnInit {
  value:any
  constructor(public dialogRef: MatDialogRef<AlertmodelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}