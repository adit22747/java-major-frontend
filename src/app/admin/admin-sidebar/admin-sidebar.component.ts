import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  userrole
  constructor() {
    this.userrole = sessionStorage.getItem('userrole')
   }


  ngOnInit(): void {
  }



}
