import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseFormComponent } from './components/course/course-form/course-form.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { VideoFormComponent } from './components/video/video-form/video-form.component';
import { VideoListComponent } from './components/video/video-list/video-list.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      {
        path: 'category',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: CategoryListComponent },
          { path: 'form', component: CategoryFormComponent },
          { path: 'form/:id', component: CategoryFormComponent },
        ],
      },
      {
        path: 'course',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: CourseListComponent },
          { path: 'form', component: CourseFormComponent },
          { path: 'form/:id', component: CourseFormComponent },
        ],
      },
      {
        path: 'video',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list/:id', component: VideoListComponent }, // must have courseId
          // { path: 'list', component: VideoListComponent },
          { path: 'form/:id', component: VideoFormComponent }, // pass courseId
          { path: 'form', component: VideoFormComponent },
        ],
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
