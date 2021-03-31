import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userrole:String
  constructor(private router:Router,private as:AuthenticateService){
    this.as.userrole.subscribe(ur=>{
      this.userrole=ur
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.as.isLoggedIn()){
      if(route.data.role && route.data.role===-1){
        this.router.navigate(["/home"])
        return false
      }
      return true
    }else{
      this.router.navigate(["/"])
      return false;
    }
      
  }
  
}
