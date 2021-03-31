import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment.prod'
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AdminService {



  len= new BehaviorSubject<any>(0)
  lenupdate=this.len.asObservable()
  userrole: any;
  
  
  constructor(private http: HttpClient) {
    // this.http.get(environment.baseUserUrl);
  }

  getCategories(): Observable<any> {
    
    return this.http.get<any>(environment.baseCategoryUrl);
  }
  
  getCourses(): Observable<any> {
  
    return this.http.get<any>(environment.baseCourseUrl);
  }
 
  getCategoriesById(id: any): Observable<any>{
    return this.http.get<any>(environment.baseCategoryUrl+"/"+id);
  }

  getCategoriesName(): Observable<any>{
    return this.http.get<any>(environment.baseCategoryUrl+"/category-name");
  }

  getCategoriesCount(): Observable<any> {
    return this.http.get<any>(environment.baseCategoryUrl+"/total");
  }
  getCourseCount(): Observable<any> {
    return this.http.get<any>(environment.baseCourseUrl+"/total");
  }
  getUserCount(): Observable<any> {
    return this.http.get<any>(environment.baseAdminUrl+"/usercount");
  }

  addCategory(categoryName: any, categoryDesc: any, categoryLogo:any):Observable<any>{
    return this.http.post<any>(environment.baseCategoryUrl,{categoryName, categoryDesc, categoryLogo})
  }

  editCategory(categoryName: any, categoryDesc: any, categoryLogo:any,categoryId:any):Observable<any>{
    return this.http.put<any>(environment.baseCategoryUrl+"/"+categoryId,{categoryName, categoryDesc, categoryLogo,categoryId})
  }
  deleteCategory(id: any): Observable<any>{
    return this.http.delete<any>(environment.baseCategoryUrl+"/"+id);
  }

  addCourse(courseName: any, courseDesc: any, courseLogo:any, coursePrice: any, likes: any,
     categoryId: any):Observable<any>{
    return this.http.post<any>(environment.baseCourseUrl+ "/" +categoryId,{courseName, courseDesc, courseLogo, coursePrice, likes, categoryId  })
  }
  getCourseById(id: any): Observable<any>{
    return this.http.get<any>(environment.baseCourseUrl+"/"+id);
  }

  editCourse(courseId:any,courseName: any, courseDesc: any, courseLogo:any,coursePrice: any,likes: any,categoryId: any):Observable<any>{
    return this.http.put<any>(environment.baseCourseUrl+"/"+courseId+"/"+categoryId,{courseName, courseDesc, courseId,coursePrice,courseLogo,likes,categoryId})
  }

  deleteCourse(id: any): Observable<any>{
    return this.http.delete<any>(environment.baseCourseUrl+"/"+id);
  }

//sorting logic
//   sortById = function(data) {
//   data.sort((a,b) => data.sr_no - data.sr_no);
// };



// getEvents(): Observable<Event[]> {    
//   return this.http.get<Event[]>(this.eventsUrl)
//     .pipe(tap(sortById))
// }   


  getVideos(): Observable<Event[]> {
    return this.http.get<Event[]>(environment.baseVideoUrl);
  }

  getVideoById(id: any): Observable<any>{
    return this.http.get<any>(environment.baseVideoUrl+"/"+id);
  }

  addVideo(videoName: any, videoDesc: any, videoPath:any,courseId:any,position:any):Observable<any>{
    return this.http.post<any>(environment.baseVideoUrl+ "/" +courseId+"/"+position,{videoName, videoDesc, videoPath,courseId  })
  }
 deleteVideo(id: any): Observable<any>{
  return this.http.delete<any>(environment.baseVideoUrl+"/"+id);
}

 editVideo(videoId:any,videoName: any,videoDesc: any,videoPath:any,courseId: any):Observable<any>{
    return this.http.put<any>(environment.baseVideoUrl+"/"+videoId+"/"+courseId,{videoName,videoDesc,videoId,videoPath,courseId})
  }

  getUsers(): Observable<any> {
   
    return this.http.get<any>(environment.baseAdminUrl+"/user");
  }

  unlockUserById(userId:any){
  
    return this.http.put<any>(environment.baseAdminUrl+"/unlockuser/"+userId, {userId})
  }


  getLockedUsers(): Observable<any>{
    return this.http.get<any>(environment.baseAdminUrl+"/lockedusers")
    
    
  }
 
  getCourseState(): Observable<any> {
    return this.http.get<any>(environment.baseCourseReportUrl)
  }
  changePaasword(flag:any,password:String ){
    return this.http.put(environment.baseAdminUrl+"/password/"+flag,{password})

  }



  updateCartSizeData(){
    this.getLockedUsers().subscribe((data1) => {
      this.len.next(data1.length)
    })
}

  }