import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AdminCategoryListComponent } from './components/admin/UI/category/admin-category-list/admin-category-list.component';
import { AdminCategoryFormComponent } from './components/admin/UI/category/admin-category-form/admin-category-form.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminCourseFormComponent } from './components/admin/UI/course/admin-course-form/admin-course-form.component';
import { AdminCourseListComponent } from './components/admin/UI/course/admin-course-list/admin-course-list.component';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { AdminVideoFormComponent } from './components/admin/UI/video/admin-video-form/admin-video-form.component';
import { AdminVideoListComponent } from './components/admin/UI/video/admin-video-list/admin-video-list.component';
import { ReportComponent } from './components/admin/UI/report/report.component';
import { AdminDashboardComponent } from './components/admin/UI/admin-dashboard/admin-dashboard.component';
import { PublicCourseDetailComponent } from './components/public-UI/public-course-detail/public-course-detail.component';
import { HomeComponent } from './components/public-UI/home/home.component';
import { PublicLayoutComponent } from './components/layout/public-layout/public-layout.component';
import { PublicCourseListComponent } from './components/public-UI/public-course-list/public-course-list.component';

const routes: Routes = [
   {
    path: '', component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'courses', component: PublicCourseListComponent },
      { path: 'courses/:id', component: PublicCourseDetailComponent, canActivate: [authGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'user', component: UserComponent },
      {
        path: 'category',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: AdminCategoryListComponent },
          { path: 'form', component: AdminCategoryFormComponent },
          { path: 'form/:id', component: AdminCategoryFormComponent },
        ],
      },
      {
        path: 'course',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: AdminCourseListComponent },
          { path: 'form', component: AdminCourseFormComponent },
          { path: 'form/:id', component: AdminCourseFormComponent },
        ],
      },
      {
        path: 'video',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list/:id', component: AdminVideoListComponent }, // must have courseId
          // { path: 'list', component: AdminVideoListComponent },
          { path: 'form/:id', component: AdminVideoFormComponent }, // pass courseId
          { path: 'form', component: AdminVideoFormComponent },
        ],
      },
      { path: 'report', component: ReportComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
