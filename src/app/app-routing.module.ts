import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AdminCategoryListComponent } from './components/admin/UI/category/admin-category-list/admin-category-list.component';
import { AdminCategoryFormComponent } from './components/admin/UI/category/admin-category-form/admin-category-form.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/password-feature/forgot-password/forgot-password.component';
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
import { adminGuard } from './core/guards/admin.guard';
import { AdminCategoryTrashComponent } from './components/admin/UI/category/admin-category-trash/admin-category-trash.component';
import { AdminCourseTrashComponent } from './components/admin/UI/course/admin-course-trash/admin-course-trash.component';
import { AdminVideoTrashComponent } from './components/admin/UI/video/admin-video-trash/admin-video-trash.component';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';
import { PublicProfileComponent } from './pages/user/public-profile/public-profile.component';
import { ResetPasswordComponent } from './components/password-feature/reset-password/reset-password.component';
import { VerificationFailedComponent } from './components/password-feature/verification-failed/verification-failed.component';
import { VerificationSuccessComponent } from './components/password-feature/verification-success/verification-success.component';
import { ResendVerificationComponent } from './components/password-feature/resend-verification/resend-verification.component';
import { AuthorApplicationComponent } from './components/features/author/pages/author-application/author-application.component';
import { VerifyEmailComponent } from './components/features/auth/pages/verify-email/verify-email.component';
import { AuthorApplicationManagementComponent } from './components/features/admin/pages/author-application-management/author-application-management.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'courses', component: PublicCourseListComponent },
      {
        path: 'courses/:id',
        component: PublicCourseDetailComponent,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        component: PublicProfileComponent,
        canActivate: [authGuard],
      },
      {
        path: 'author-application',
        component: AuthorApplicationComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'verification-success',
    component: VerificationSuccessComponent,
  },
  {
    path: 'verification-failed',
    component: VerificationFailedComponent,
  },
  {
    path: 'resend-verification',
    component: ResendVerificationComponent,
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'user', component: UserComponent, canActivate: [adminGuard] },
      { path: 'profile', component: AdminProfileComponent },
      {
        path: 'author-application-management',
        component: AuthorApplicationManagementComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'category',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: AdminCategoryListComponent },
          { path: 'form', component: AdminCategoryFormComponent },
          { path: 'form/:id', component: AdminCategoryFormComponent },
          { path: 'trash', component: AdminCategoryTrashComponent },
        ],
      },
      {
        path: 'course',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: AdminCourseListComponent },
          { path: 'form', component: AdminCourseFormComponent },
          { path: 'form/:id', component: AdminCourseFormComponent },
          { path: 'trash', component: AdminCourseTrashComponent },
        ],
      },
      {
        path: 'video',
        children: [
          // { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list/:courseId', component: AdminVideoListComponent }, // must have courseId
          // { path: 'list', component: AdminVideoListComponent },
          { path: 'form/course/:courseId', component: AdminVideoFormComponent }, // pass courseId
          { path: 'form/:id', component: AdminVideoFormComponent },
          { path: 'trash', component: AdminVideoTrashComponent },
        ],
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [adminGuard],
      },
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
