import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/authenticate.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  userrole: any;
  constructor(private as:AuthenticateService) { }

  ngOnInit(): void {
    this.userrole=this.as.userrole
  }

}
