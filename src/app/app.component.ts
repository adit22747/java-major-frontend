import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from './authenticate.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ui';
  userrole:Observable<String>
  constructor(private as:AuthenticateService , private route:Router){
    this.userrole=this.as.userrole

  }

  logout(){
    this.as.logout()
    this.route.navigate(["/"])

  
  }
  profile(){
    this.route.navigate(["/createprofile"])

  }
}
