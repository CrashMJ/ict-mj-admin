import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg";
import { PagesRoutingModule } from "./pages-routing.module";
import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslationModule } from "../modules/i18n/translation.module";
import { LayoutComponent } from "./_layout/layout.component";
import { ScriptsInitComponent } from "./_layout/init/scipts-init/scripts-init.component";
import { HeaderMobileComponent } from "./_layout/components/header-mobile/header-mobile.component";
import { AsideComponent } from "./_layout/components/aside/aside.component";
import { FooterComponent } from "./_layout/components/footer/footer.component";
import { HeaderComponent } from "./_layout/components/header/header.component";
import { HeaderMenuComponent } from "./_layout/components/header/header-menu/header-menu.component";
import { TopbarComponent } from "./_layout/components/topbar/topbar.component";
import { ExtrasModule } from "../_metronic/partials/layout/extras/extras.module";
import { LanguageSelectorComponent } from "./_layout/components/topbar/language-selector/language-selector.component";
import { CoreModule } from "../_metronic/core";
import { SubheaderModule } from "../_metronic/partials/layout/subheader/subheader.module";
import { AsideDynamicComponent } from "./_layout/components/aside-dynamic/aside-dynamic.component";
import { HeaderMenuDynamicComponent } from "./_layout/components/header/header-menu-dynamic/header-menu-dynamic.component";
import { AdminManagementComponent } from "./_layout/components/admin-management/admin-management.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TestComponent } from "./_layout/components/test/test.component";
import { AdminComponent } from "./_layout/components/admin/admin.component";
import { BannerManagementComponent } from "./_layout/components/banner-management/banner-management.component";
import { FaqManagementComponent } from "./_layout/components/tip-info-management/faq-management.component";
import { VideoManagementComponent } from "./_layout/components/video-management/video-management.component";
import { NotificationManagementComponent } from "./_layout/components/notification-management/notification-management.component";
import { DeleteModelComponent } from "./_layout/components/shared/delete-model/delete-model.component";
import { DeleteService } from "./_layout/components/shared/delete-model/delete.service";
import { NgxPaginationModule } from "ngx-pagination";
import { CouponManagementComponent } from "./_layout/components/coupon-management/coupon-management.component";
import { ContactUsManagementComponent } from "./_layout/components/contact-us-management/contact-us-management.component";
import { ReceiptsComponent } from "./_layout/components/receipts/receipts.component";
import { EditReceiptsComponent } from "./_layout/components/receipts/edit-receipts/edit-receipts.component";
import { ReceiptsModalComponent } from "./_layout/components/receipts/receipts-modal/receipts-modal.component";
import { LiveClassManagementComponent } from "./_layout/components/live-class-management/live-class-management.component";

// import { PdfViewerModule } from 'ng2-pdf-viewer';

import { A11yModule } from "@angular/cdk/a11y";
// import {ClipboardModule} from '@angular/cdk/clipboard';
// import {DragDropModule} from '@angular/cdk/drag-drop';
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
// import {MatBadgeModule} from '@angular/material/badge';
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { OverlayModule } from "@angular/cdk/overlay";
import { NgxDocViewerModule } from "ngx-doc-viewer";
import { PaymentComponent } from "./_layout/components/payments/payments.component";
import { VodEnrollComponent } from "./_layout/components/vod-enrollments/vod-enrollments.component";
import { VodSubscriptionComponent } from "./_layout/components/vod-subscriptions/vod-subscriptions.component";
import { RankingMedalsManagementComponent } from "./_layout/components/ranking-medals-management/ranking-medals-management.component";
import { VideoCommentManagementComponent } from "./_layout/components/video-comment-management/video-comment-management.component";
import { SettingManagementComponent } from "./_layout/components/setting-management/setting-management.component";
import { LiveTeacherManagementComponent } from "./_layout/components/live-teacher-management/live-teacher-management.component";
import { AfterALManagementComponent } from "./_layout/components/after-al-management/after-al-management.component";
import { AlSquadPostManagementComponent } from "./_layout/components/al-squad-post-management/al-squad-post-management.component";
import { LiveEnrollComponent } from "./_layout/components/live-enrollments/live-enrollments.component";
import { LivePaymentComponent } from "./_layout/components/live-payments/payments.component";
import { PaymentLogManagementComponent } from "./_layout/components/payment-log/payment-log.component";
import { SltSubscriptionsComponent } from "./_layout/components/slt-subscriptions/slt-subscriptions.component";
import { PayhereSubscriptionsComponent } from "./_layout/components/payhere-subscriptions/payhere-subscriptions.component";
import { FailSubscriptionsComponent } from "./_layout/components/fail-subscriptions/fail-subscriptions.component";
import { BankSubscriptionsComponent } from "./_layout/components/bank-subscriptions/bank-subscriptions.component";
import { SubscriptionFreeCardComponent } from "./_layout/components/subscription-free-cards/subscription-free-cards.component";
import { ReviewsManagementComponent } from "./_layout/components/reviews/reviews-management.component";
import { OpenResourceComponent } from "./_layout/components/open-resources/open-resources.component";
import { InqManagementComponent } from "./_layout/components/inq/inq.component";
import { ApiLogManagementComponent } from "./_layout/components/api-log/api-log.component";
import { AssignManagementComponent } from "./_layout/components/assignment-management/assignment-management.component";
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { LessonComponent } from "./_layout/components/lessons/lesson.component";
import { LessonPurchaseComponent } from "./_layout/components/lessons-purchase/lesson-purchase.component";

@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,
    AdminManagementComponent,
    TestComponent,
    AdminComponent,
    BannerManagementComponent,
    FaqManagementComponent,
    PaymentLogManagementComponent,
    ApiLogManagementComponent,
    VideoManagementComponent,
    NotificationManagementComponent,
    CouponManagementComponent,
    ContactUsManagementComponent,
    ReceiptsComponent,
    EditReceiptsComponent,
    ReceiptsModalComponent,
    LiveClassManagementComponent,
    VodEnrollComponent,
    VodSubscriptionComponent,
    PaymentComponent,
    RankingMedalsManagementComponent,
    VideoCommentManagementComponent,
    SettingManagementComponent,
    LiveTeacherManagementComponent,
    AfterALManagementComponent,
    AlSquadPostManagementComponent,
    LiveEnrollComponent,
    LivePaymentComponent,
    SltSubscriptionsComponent,
    PayhereSubscriptionsComponent,
    FailSubscriptionsComponent,
    BankSubscriptionsComponent,
    SubscriptionFreeCardComponent,
    ReviewsManagementComponent,
    OpenResourceComponent,
    InqManagementComponent,
    AssignManagementComponent,
    LessonComponent,
    LessonPurchaseComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslationModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    SubheaderModule,
    ReactiveFormsModule,
    NgxPaginationModule,

    NgxDocViewerModule,

    A11yModule,
    // ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    // DragDropModule,
    MatAutocompleteModule,
    // MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    NgbRatingModule,
  ],
  providers: [DeleteService],
})
export class LayoutModule {}
