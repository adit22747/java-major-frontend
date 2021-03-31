import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod'
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient) { }

  getComment(courseid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/comment?courseid=' + courseid)
  }

  addComment(userid: number, courseid: number, comment: String): Observable<any> {
    return this.http.post(environment.baseUserUrl + '/comment?courseid=' + courseid + '&userid=' + userid + '&comment_msg=' + comment, "", { responseType: 'text' })
  }

  updateComment(userid: number, courseid: number, comment: String, commentid: number): Observable<any> {
    return this.http.put(environment.baseUserUrl + '/comment?courseid=' + courseid + '&userid=' + userid + '&comment_msg=' + comment + '&commentid=' + commentid, "", { responseType: 'text' })
  }

  deletecomment(commentid: number): Observable<any> {
    return this.http.delete(environment.baseUserUrl + '/comment?commentid=' + commentid)
  }

  getFeedback(courseid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/feedback?courseid=' + courseid)
  }

  addFeedback(userid: number, courseid: number, feedback: String, rating: number): Observable<any> {
    return this.http.post(environment.baseUserUrl + '/feedback?courseid=' + courseid + '&userid=' + userid + '&feedback_msg=' + feedback + '&rating=' + rating, "", { responseType: 'text' })
  }

  getCourses(): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/courses')
  }

  getCoursById(courseid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/course?courseid=' + courseid)
  }

  getFeedbackcount(courseid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/feedbackcount?courseid=' + courseid)
  }

  getCommentcount(courseid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/commentcount?courseid=' + courseid)
  }

  getVideos(courseid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/videos?courseid=' + courseid)
  }

  addlikes(courseid: number, userid: number): Observable<any> {
    return this.http.put(environment.baseUserUrl + '/like/' + courseid + '/' + userid, "")
  }

  removelikes(courseid: number, userid: number): Observable<any> {
    return this.http.delete(environment.baseUserUrl + '/unlike/' + courseid + '/' + userid,{ responseType: 'text' })
  }

  getlike(courseid: number, userid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/isliked/' + courseid + '/' + userid,{ responseType: 'text' })
  }

  addEnrollement(courseid: number, userid: number): Observable<any> {
    return this.http.put(environment.baseUserUrl + '/enroll/' + courseid + '/' + userid, "",{ responseType: 'text' })
  }

  getEnrollement(courseid: number, userid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/isenrolled/' + courseid + '/' + userid)
  }

  getVideoslist(courseid: number, userid: number): Observable<Video> {
    return this.http.get<Video>(environment.baseUserUrl + '/enrolledcourses/video/' + courseid + '/' + userid)
  }

  nextVideo(courseid, userid, videoid): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/nextvideo/' + courseid + '/' + userid + '/' + videoid)
  }

  completeVideo(courseid, userid, videoid): Observable<any> {
    return this.http.put(environment.baseUserUrl + '/completevideo/' + courseid + '/' + userid + '/' + videoid, "")
  }

  completedcourse(courseid: number, userid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/iscompleted/' + courseid + '/' + userid)
  }

  generatepdf(courseid: number, userid: number): Observable<any> {
    return this.http.get(environment.baseUserUrl + '/generatePdf/' + courseid + '/' + userid)
  }

  get(): Observable<any> {
    return this.http.get(environment.baseUserUrl)
  }

  delUser(id): Observable<any> {
    return this.http.delete(environment.baseUserUrl + "/" + id)
  }

  addUser(user: any) {
    return this.http.post(environment.baseUserUrl + "/adduser", user, { responseType: 'text' })
  }

  isActivated(userid) {
    return this.http.get(environment.baseUserUrl + "/isActivated/" + userid)
  }

  sendregotp(userid) {
    return this.http.get(environment.baseUserUrl + "/regotp?userid=" + userid, { responseType: 'text' })
  }

  verifyotp(status: boolean, username: string) {
    return this.http.get(environment.baseUserUrl + "/verifyreg/" + 1 + "/" + username)
  }

  forgotopt(email: string) {
    return this.http.get(environment.baseUserUrl + "/forgototp/" + email)
  }

  changepass(email: string, password: string) {
    return this.http.get(environment.baseUserUrl + "/changepass/" + password + "/" + email, { responseType: 'text' })
  }

  createProfile(profile: any, userid, data) {
    return this.http.post(environment.baseUserUrl + "/profile/" + userid, profile, data)

  }
  isProfileCreated(userid) {
    return this.http.get(environment.baseUserUrl + "/isProfileCreated/" + userid)
  }

  getprofiledetails(userid){
    return this.http.get(environment.baseUserUrl + "/profile/" + userid)
  }

  checkUsername(username:String){
    return this.http.get(environment.baseUserUrl+"/username/"+username)

   }
   checkEmail(email:String){
    return this.http.get(environment.baseUserUrl+"/email/"+email)

   }
   getcerti(userid:any,courseid:any){
    return this.http.get(environment.baseUserUrl+"/getcert/"+courseid+"/"+userid,{ responseType: 'text' })


   }
   mailcerti(userid:any,courseid:any){
    return this.http.get(environment.baseUserUrl+"/sendcert/"+courseid+"/"+userid,{ responseType: 'text' })

   }
   getFCourses(userid:any){
    return this.http.get(environment.baseUserUrl + "/finished/" + userid)

   }
   getECourses(userid:any){
    return this.http.get(environment.baseUserUrl + "/enrolled/" + userid)
     
  }
  getEdates(userid:any){
    return this.http.get(environment.baseUserUrl + "/enrolleddates/" + userid)

  }
  getFdates(userid:any){
    return this.http.get(environment.baseUserUrl + "/finisheddates/" + userid)

  }
  getCerties(userid:any){
    return this.http.get(environment.baseUserUrl + "/certificates/" + userid)

  }
  getVideoStatus(userid:any,courseid:any){
    return this.http.get(environment.baseUserUrl + "/getVideoStatus/"+courseid+"/"+userid)
   
    
  }

  getcoursesbycat(categroyid:number){
    return this.http.get(environment.baseUserUrl + "/coursesbycatId/"+categroyid)
  }

  changePassword(userid:number,password:string ){
    return this.http.put(environment.baseUserUrl+"/changepass/"+userid,{password},{responseType:"text"})

  }
  isFeedbackGiven(userid:number,courseid:number){
    return this.http.get(environment.baseUserUrl+"/getFeedbackStatus/"+courseid+"/"+userid,{ responseType: 'text' })

  }

  forgotpass(password:string,email:string){
    return this.http.put(environment.baseUserUrl+"/forgotpass/"+email,{password},{ responseType: 'text' })

  }

}