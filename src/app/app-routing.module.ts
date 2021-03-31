import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddCourseComponent } from './admin/add-course/add-course.component';
import { AddVideoComponent } from './admin/add-video/add-video.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { BarChartComponent } from './admin/bar-chart/bar-chart.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { CommentChartComponent } from './admin/comment-chart/comment-chart.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { EditCourseComponent } from './admin/edit-course/edit-course.component';
import { EditVideoComponent } from './admin/edit-video/edit-video.component';
import { LineChartComponent } from './admin/line-chart/line-chart.component';
import { LockedUserNotificationComponent } from './admin/locked-user-notification/locked-user-notification.component';
import { PieChartComponent } from './admin/pie-chart/pie-chart.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { UserLogComponent } from './admin/user-log/user-log.component';
import { VideoChartComponent } from './admin/video-chart/video-chart.component';
import { ViewCategoryComponent } from './admin/view-category/view-category.component';
import { ViewCourseComponent } from './admin/view-course/view-course.component';
import { ViewUserComponent } from './admin/view-user/view-user.component';
import { ViewVideoComponent } from './admin/view-video/view-video.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { HeaderComponent } from './shared/header/header.component';
import { IndexComponent } from './shared/index/index.component';

import { RegisterComponent } from './shared/register/register.component';
import { CourseDetailComponent } from './usermodule/course-detail/course-detail.component';
import { CoursesComponent } from './usermodule/courses/courses.component';
import { CreateprofileComponent } from './usermodule/createprofile/createprofile.component';
import { HelpComponent } from './usermodule/help/help.component';
import { MycoursesComponent } from './usermodule/mycourses/mycourses.component';
import { UserhomeComponent } from './usermodule/userhome/userhome.component';
import { VerifyComponent } from './usermodule/verify/verify.component';
import { VideoDisplayComponent } from './usermodule/video-display/video-display.component';

const routes: Routes = [

  { path: "", component: IndexComponent },
  { path: "register", component: RegisterComponent },
  { path: "createprofile", component: CreateprofileComponent },
  { path: "header", component: HeaderComponent },
  {
    path: 'verify', component: VerifyComponent,
    data: { role: "user" },canActivate:[AuthGuard]
  },
  {
    path: "user", component: UserhomeComponent,
    data: { role: "user" },
    canActivate:[AuthGuard]
  },
  {
    path: 'admin', component: AdminDashboardComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  // { path: "admin", component: AdminhomeComponent, data: { role: "ROLE_ADMIN" } },
  {
    path: "forgot", component: ForgotPasswordComponent,
    data: { role: "user" },canActivate:[AuthGuard]
  },
  {
    path: 'coursedetail', component: CourseDetailComponent,
    data: { role: "user" },canActivate:[AuthGuard]
  },
  {
    path: 'videolist', component: VideoDisplayComponent,
    data: { role: "user" },canActivate:[AuthGuard]
  },
  {
    path: 'courses', component: MycoursesComponent,
    data: { role: "user" },canActivate:[AuthGuard]
  },
  {
    path: 'categories', component: ViewCategoryComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'add-category', component: AddCategoryComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'edit-category/:id', component: EditCategoryComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'courses_admin', component: ViewCourseComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'edit-course/:id', component: EditCourseComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'add-course', component: AddCourseComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'videos', component: ViewVideoComponent,
    data: { role:"admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'edit-video/:id', component: EditVideoComponent,
    data: { role:"admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'add-video', component: AddVideoComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'users', component: ViewUserComponent,
    data: { role: "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'locked-notification', component: LockedUserNotificationComponent,
    data: { role: "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'user-logs', component: UserLogComponent,
    data: { role: "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'reports', component: ReportsComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'bar-chart', component: BarChartComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'line-chart', component: LineChartComponent,
    data: { role: "admin"|| "prime"},canActivate:[AuthGuard]
  },
  {
    path: 'pie-chart', component: PieChartComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'comment-chart', component: CommentChartComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'video-chart', component: VideoChartComponent,
    data: { role: "admin"|| "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'changepassword', component: ChangePasswordComponent,
    data: { role: "prime" },canActivate:[AuthGuard]
  },
  {
    path: 'help', component: HelpComponent,
    data: { role: "user" },canActivate:[AuthGuard]
  },
  {
    path: '**', component: ErrorComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
