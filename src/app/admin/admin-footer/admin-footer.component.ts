import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss']
})
export class AdminFooterComponent implements OnInit {
  userrole: any;

  constructor(private as: AdminService) { }

  ngOnInit(): void {

    this.userrole = this.as.userrole
  }

}
