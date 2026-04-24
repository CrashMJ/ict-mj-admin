import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./_layout/layout.component";
import { AuthGuard } from "src/app/modules/auth/_services/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      // },
      {
        path: "builder",
        loadChildren: () =>
          import("./builder/builder.module").then((m) => m.BuilderModule),
      },
      {
        path: "ecommerce",
        loadChildren: () =>
          import("../modules/e-commerce/e-commerce.module").then(
            (m) => m.ECommerceModule
          ),
      },
      {
        path: "user-management",
        loadChildren: () =>
          import("../modules/user-management/user-management.module").then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: "user-profile",
        loadChildren: () =>
          import("../modules/user-profile/user-profile.module").then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: "ngbootstrap",
        loadChildren: () =>
          import("../modules/ngbootstrap/ngbootstrap.module").then(
            (m) => m.NgbootstrapModule
          ),
      },
      {
        path: "wizards",
        loadChildren: () =>
          import("../modules/wizards/wizards.module").then(
            (m) => m.WizardsModule
          ),
      },
      {
        path: "material",
        loadChildren: () =>
          import("../modules/material/material.module").then(
            (m) => m.MaterialModule
          ),
      },
      {
        path: "admin",
        loadChildren: () =>
          import(
            "./_layout/components/admin-management/admin-management.module"
          ).then((m) => m.AdminManagementModule),
      },
      {
        path: "student",
        loadChildren: () =>
          import(
            "./_layout/components/student-management/student-management.module"
          ).then((m) => m.StudentManagementModule),
      },
      {
        path: "VOD-teacher",
        loadChildren: () =>
          import(
            "./_layout/components/teacher-management/teacher-management.module"
          ).then((m) => m.TeacherManagementModule),
      },
      {
        path: "live-teacher",
        loadChildren: () =>
          import(
            "./_layout/components/live-teacher-management/live-teacher-management.module"
          ).then((m) => m.LiveTeacherManagementModule),
      },
      {
        path: "live-class",
        loadChildren: () =>
          import(
            "./_layout/components/live-class-management/live-class-management.module"
          ).then((m) => m.LiveClassManagementModule),
      },
      {
        path: "quiz",
        loadChildren: () =>
          import("./_layout/components/quiz/quiz.module").then(
            (m) => m.QuizModule
          ),
      },
      {
        path: "banner",
        loadChildren: () =>
          import(
            "./_layout/components/banner-management/banner-management.module"
          ).then((m) => m.BannerManagementModule),
      },
      {
        path: "faq",
        loadChildren: () =>
          import(
            "./_layout/components/tip-info-management/faq-management.module"
          ).then((m) => m.TipInfoManagementModule),
      },
      {
        path: "inq",
        loadChildren: () =>
          import(
            "./_layout/components/inq/inq.module"
          ).then((m) => m.InqManagementModule),
      },
      {
        path: "assignments",
        loadChildren: () =>
          import(
            "./_layout/components/assignment-management/assignment-management.module"
          ).then((m) => m.AssignManagementModule),
      },
      {
        path: "reviews",
        loadChildren: () =>
          import("./_layout/components/reviews/reviews-management.module").then(
            (m) => m.ReviewsManagementModule
          ),
      },
      {
        path: "payment-log",
        loadChildren: () =>
          import("./_layout/components/payment-log/payment-log.module").then(
            (m) => m.PaymentLogManagementModule
          ),
      },
      {
        path: "api-log",
        loadChildren: () =>
          import("./_layout/components/api-log/api-log.module").then(
            (m) => m.ApiLogManagementModule
          ),
      },
      {
        path: "payments",
        loadChildren: () =>
          import("./_layout/components/payments/payments.module").then(
            (m) => m.PaymentsModule
          ),
      },
      {
        path: "enrollments",
        loadChildren: () =>
          import(
            "./_layout/components/vod-enrollments/vod-enrollments.module"
          ).then((m) => m.VodEnrollsModule),
      },
      {
        path: "live-enrollments",
        loadChildren: () =>
          import(
            "./_layout/components/live-enrollments/live-enrollments.module"
          ).then((m) => m.LiveEnrollsModule),
      },
      {
        path: "live-payments",
        loadChildren: () =>
          import("./_layout/components/live-payments/payments.module").then(
            (m) => m.LivePaymentsModule
          ),
      },
      {
        path: "vod-subscriptions",
        loadChildren: () =>
          import(
            "./_layout/components/vod-subscriptions/vod-subscriptions.module"
          ).then((m) => m.VodSubscriptionsModule),
      },
      {
        path: "slt-subscriptions",
        loadChildren: () =>
          import(
            "./_layout/components/slt-subscriptions/slt-subscriptions.module"
          ).then((m) => m.SltSubscriptionsModule),
      },
      {
        path: "bank-subscriptions",
        loadChildren: () =>
          import(
            "./_layout/components/bank-subscriptions/bank-subscriptions.module"
          ).then((m) => m.BankSubscriptionsModule),
      },
      {
        path: "subscription-free-card",
        loadChildren: () =>
          import(
            "./_layout/components/subscription-free-cards/subscription-free-cards.module"
          ).then((m) => m.SubscriptionsFreeCardModule),
      },
      {
        path: "payhere-subscriptions",
        loadChildren: () =>
          import(
            "./_layout/components/payhere-subscriptions/payhere-subscriptions.module"
          ).then((m) => m.PayhereSubscriptionsModule),
      },
      {
        path: "fail-subscriptions",
        loadChildren: () =>
          import(
            "./_layout/components/fail-subscriptions/fail-subscriptions.module"
          ).then((m) => m.FailSubscriptionsModule),
      },
      {
        path: "course",
        loadChildren: () =>
          import(
            "./_layout/components/subject-management/subject-management.module"
          ).then((m) => m.SubjectManagementModule),
      },
      {
        path: "open-resources",
        loadChildren: () =>
          import(
            "./_layout/components/open-resources/open-resources.module"
          ).then((m) => m.OpenResourcesModule),
      },
      {
        path: "lessons",
        loadChildren: () =>
          import("./_layout/components/lessons/lesson.module").then(
            (m) => m.lessonModule
          ),
      },
      {
        path: "lessons-purchase",
        loadChildren: () =>
          import("./_layout/components/lessons-purchase/lesson-purchase.module").then(
            (m) => m.lessonPurchaseModule
          ),
      },
      {
        path: "video",
        loadChildren: () =>
          import(
            "./_layout/components/video-management/video-management.module"
          ).then((m) => m.VideoManagementModule),
      },
      {
        path: "notification",
        loadChildren: () =>
          import(
            "./_layout/components/notification-management/notification-management.module"
          ).then((m) => m.NotificationManagementModule),
      },
      {
        path: "coupon",
        loadChildren: () =>
          import(
            "./_layout/components/coupon-management/coupon-management.module"
          ).then((m) => m.CouponManagementModule),
      },
      {
        path: "contactUs",
        loadChildren: () =>
          import(
            "./_layout/components/contact-us-management/contact-us-management.module"
          ).then((m) => m.ContactUsManagementModule),
      },
      {
        path: "receipt",
        loadChildren: () =>
          import("./_layout/components/receipts/receipts.module").then(
            (m) => m.ReceiptsModule
          ),
      },
      {
        path: "live-class",
        loadChildren: () =>
          import(
            "./_layout/components/live-class-management/live-class-management.module"
          ).then((m) => m.LiveClassManagementModule),
      },
      {
        path: "afterAL",
        loadChildren: () =>
          import(
            "./_layout/components/after-al-management/after-al-management.module"
          ).then((m) => m.AfterALManagementModule),
      },
      {
        path: "aL-squard",
        loadChildren: () =>
          import(
            "./_layout/components/al-squad-post-management/al-squad-post-management.module"
          ).then((m) => m.AlSquadPostManagementModule),
      },
      {
        path: "admin123",
        loadChildren: () =>
          import("./_layout/components/admin/admin.module").then(
            (m) => m.AdminModule
          ),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./_layout/components/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "report",
        loadChildren: () =>
          import("./_layout/components/report/report.module").then(
            (m) => m.ReportModule
          ),
      },
      {
        path: "analyticsreport",
        loadChildren: () =>
          import("./_layout/components/report-analytics/report.module").then(
            (m) => m.ReportAnalyticsModule
          ),
      },
      {
        path: "ranking",
        loadChildren: () =>
          import(
            "./_layout/components/ranking-medals-management/ranking-medals-management.module"
          ).then((m) => m.RankingMedalsManagementModule),
      },
      {
        path: "video-comment",
        loadChildren: () =>
          import(
            "./_layout/components/video-comment-management/video-comment-management.module"
          ).then((m) => m.VideoCommentManagementModule),
      },
      {
        path: "setting",
        loadChildren: () =>
          import(
            "./_layout/components/setting-management/setting-management.module"
          ).then((m) => m.SettingManagementModule),
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        redirectTo: "errors/404",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
