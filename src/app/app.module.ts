import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/admin/UI/sidebar/sidebar.component';
import { FooterComponent } from './components/admin/UI/footer/footer.component';
import { UserComponent } from './components/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AdminCategoryListComponent } from './components/admin/UI/category/admin-category-list/admin-category-list.component';
import { AdminCategoryFormComponent } from './components/admin/UI/category/admin-category-form/admin-category-form.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { AdminCourseListComponent } from './components/admin/UI/course/admin-course-list/admin-course-list.component';
import { AdminCourseFormComponent } from './components/admin/UI/course/admin-course-form/admin-course-form.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { AdminVideoFormComponent } from './components/admin/UI/video/admin-video-form/admin-video-form.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { AdminVideoListComponent } from './components/admin/UI/video/admin-video-list/admin-video-list.component';
import { IndexComponent } from './components/admin/UI/index/index.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ReportComponent } from './components/admin/UI/report/report.component';
import { PublicLayoutComponent } from './components/layout/public-layout/public-layout.component';
import { AdminDashboardComponent } from './components/admin/UI/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './components/admin/UI/navbar/navbar.component';
import { NavbarPublicComponent } from './components/public-UI/navbar-public/navbar-public.component';
import { FooterPublicComponent } from './components/public-UI/footer-public/footer-public.component';
import { HomeComponent } from './components/public-UI/home/home.component';
import { PublicCourseDetailComponent } from './components/public-UI/public-course-detail/public-course-detail.component';
import { HeroSectionComponent } from './components/public-UI/hero-section/hero-section.component';
import { FeatureSectionComponent } from './components/public-UI/feature-section/feature-section.component';
import { PopularCourseSectionComponent } from './components/public-UI/popular-course-section/popular-course-section.component';
import { StatisticSectionComponent } from './components/public-UI/statistic-section/statistic-section.component';
import { CtaSectionComponent } from './components/public-UI/cta-section/cta-section.component';
import { PublicCourseListComponent } from './components/public-UI/public-course-list/public-course-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    UserComponent,
    MainLayoutComponent,
    AdminCategoryListComponent,
    AdminCategoryFormComponent,
    IndexComponent,
    LoginComponent,
    AdminCourseListComponent,
    AdminCourseFormComponent,
    AdminVideoFormComponent,
    AdminVideoListComponent,
    AdminDashboardComponent,
    SignupComponent,
    SafeUrlPipe,
    ReportComponent,
    PublicLayoutComponent,
    NavbarPublicComponent,
    FooterPublicComponent,
    PublicLayoutComponent,
    NavbarPublicComponent,
    FooterPublicComponent,
    HomeComponent,
    HeroSectionComponent,
    FeatureSectionComponent,
    PopularCourseSectionComponent,
    StatisticSectionComponent,
    CtaSectionComponent,
    PublicCourseDetailComponent,
    PublicCourseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
