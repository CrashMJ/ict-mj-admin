import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfterALManagementRoutingModule } from './after-al-management-routing.module';
import { CategoriesManagementComponent } from './categories-management/categories-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxPaginationModule } from 'ngx-pagination';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CategoryModalComponent } from './categories-management/category-modal/category-modal.component';
import { InstituteManagementComponent } from './institute-management/institute-management.component';
import { InstituteModalComponent } from './institute-management/institute-modal/institute-modal.component';
import { EditInstituteComponent } from './institute-management/edit-institute/edit-institute.component';
import { EditCategoryComponent } from './categories-management/edit-category/edit-category.component';
import { OptionManagementComponent } from './option-management/option-management.component';
import { EditOptionComponent } from './option-management/edit-option/edit-option.component';
import { OptionModalComponent } from './option-management/option-modal/option-modal.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { CampusContactUsManagementComponent } from './campus-contact-us-management/campus-contact-us-management.component';
import { CampusContactModalComponent } from './campus-contact-us-management/campus-contact-modal/campus-contact-modal.component';
import { EditCampusContactComponent } from './campus-contact-us-management/edit-campus-contact/edit-campus-contact.component';


@NgModule({
  declarations: [CategoriesManagementComponent, CategoryModalComponent, InstituteManagementComponent, InstituteModalComponent, EditInstituteComponent, EditCategoryComponent, OptionManagementComponent, EditOptionComponent, OptionModalComponent, CampusContactUsManagementComponent, CampusContactModalComponent, EditCampusContactComponent],
  imports: [
    CommonModule,
    AfterALManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule,
    NgxPaginationModule,

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
    NgxDocViewerModule
  ]
})
export class AfterALManagementModule { }
