import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/_services/auth.service';
import { environment } from 'src/environments/environment';
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import highlight from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from 'src/app/modules/auth/_services/authInterceptor';
import { VideoService } from 'src/app/pages/_layout/components/video-management/services/video.service';
import { GetAllStudentResolver } from 'src/app/pages/_layout/components/student-management/resolvers/getAllStudent.resolver';
import { GetAllTeacherResolver } from 'src/app/pages/_layout/components/teacher-management/resolvers/getAllTeachers.resolver';
import { TeacherService } from 'src/app/pages/_layout/components/teacher-management/services/teacher.service';
import { GetAllAdminResolver } from './pages/_layout/components/admin-management/resolvers/getAllAdmin.resolver';
import { AdminManagementService } from './pages/_layout/components/admin-management/services/admin.service';
import { GetAdminByIdResolver } from './pages/_layout/components/admin-management/resolvers/getAdminById.resolver';
import { GetAllSubjectResolver } from './pages/_layout/components/subject-management/resolvers/getAllSubject.resolver';
import { SubjectService } from './pages/_layout/components/subject-management/services/subject.service';
import { GetAllVideoResolver } from './pages/_layout/components/video-management/resolver/getAllVideo.resolver';
import { NotificationService } from './pages/_layout/components/notification-management/services/notification.service';
import { GetAllNotificationResolver } from './pages/_layout/components/notification-management/resolvers/getAllNotification.resolver';
import { TipInfoService } from './pages/_layout/components/tip-info-management/services/faq.service';
import { GetAllTipResolver } from './pages/_layout/components/tip-info-management/resolvers/getAllTips.resolver';
import { ToastrModule } from 'ngx-toastr';
import { GetAllCouponResolver } from './pages/_layout/components/coupon-management/resolvers/getAllCoupon.resolver';
import { CouponService } from './pages/_layout/components/coupon-management/services/coupon.service';
import { ContactUsService } from './pages/_layout/components/contact-us-management/services/contact-us.service';
import { GetAllContactUsResolver } from './pages/_layout/components/contact-us-management/resolvers/getAllContactUs.reslover';
import { GetAllReceiptsResolver } from './pages/_layout/components/receipts/resolvers/getAllReceipts.resolver';
import { ReceiptService } from './pages/_layout/components/receipts/services/receipt.service';
import { LiveClassService } from './pages/_layout/components/live-class-management/services/liveClass.service';
import { GetAllLiveClassResolver } from './pages/_layout/components/live-class-management/resolvers/getAllLiveClass.resolver';

import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { RankingMedalService } from './pages/_layout/components/ranking-medals-management/services/rankingMedal.service';
import { VideoCommentService } from './pages/_layout/components/video-comment-management/services/videoComment.service';
import { SettingService } from './pages/_layout/components/setting-management/services/setting.service';
import { LiveTeacherService } from './pages/_layout/components/live-teacher-management/services/live-teacher.service';
import { CategoryService } from './pages/_layout/components/after-al-management/categories-management/service/category.service';
import { InstituteService } from './pages/_layout/components/after-al-management/institute-management/service/institute.service';
import { CampusContactUsService } from './pages/_layout/components/after-al-management/campus-contact-us-management/service/campus-contactUs.service';
import { AlSquadPostService } from './pages/_layout/components/al-squad-post-management/service/al-squad-post.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { SltSubscriptionService } from './pages/_layout/components/slt-subscriptions/services/sltSubscription.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
export function getHighlightLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml },
    { name: 'json', func: json },
  ];
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
        passThruUnknownUrl: true,
        dataEncapsulation: false,
      })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),
    NgxDocViewerModule,
    YouTubePlayerModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages,
      },
    },
    VideoService,
    // VideoResolver,
    GetAllStudentResolver,
    GetAllTeacherResolver,
    GetAllAdminResolver,
    TeacherService,
    AdminManagementService,
    GetAdminByIdResolver,
    GetAllSubjectResolver,
    SubjectService,
    GetAllVideoResolver,
    NotificationService,
    GetAllNotificationResolver,
    TipInfoService,
    GetAllTipResolver,
    GetAllCouponResolver,
    CouponService,
    GetAllContactUsResolver,
    ContactUsService,
    GetAllReceiptsResolver,
    ReceiptService,
    GetAllLiveClassResolver,
    LiveClassService,
    RankingMedalService,
    VideoCommentService,
    SettingService,
    LiveTeacherService,
    CategoryService,
    InstituteService,
    CampusContactUsService,
    AlSquadPostService,
    SltSubscriptionService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
