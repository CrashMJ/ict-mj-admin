import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from "@angular/forms";
import { UserModel } from "src/app/modules/auth";
import { LessonService } from "../services/lesson.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SubjectService } from "../../subject-management/services/subject.service";
import { districts } from "src/config/districts.config";
import { environment } from "src/environments/environment";
import { VodEnrollService } from "../../vod-enrollments/services/vod-enroll.service";
import { VodSubscriptionService } from "../../vod-subscriptions/services/vod-subscription.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-edit-lesson",
  templateUrl: "./edit-lesson.component.html",
  styleUrls: ["./edit-lesson.component.scss"],
})
export class EditLessonComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  user: UserModel;
  lessonResponse: any;
  id: any;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;
  fileToUpload: File = null;
  imagesPreview: string[] = []; // To preview the images
  selectedFiles: File[] = [];
  allLessons: any[] = [];
  selectedLessonId: number | null = null;
  selectedLesson: any = null;
  selectedPaymentType: string = '';

  displayedColumns3: string[] = [
    "id",
    "name",
    "grade_type",
    "duration",
    "paid_type",
    "price",
    "action"
  ];
  dataSource3: MatTableDataSource<any>;
  pagination_item_counts2 = environment.pagination_item_counts;
  pagination_data2 = environment.pagination_data;

  searchArray: any = {"status": 'active', "type": 'individual'};

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchLessonDetail();
    this.fetchAvailableLessons(this.searchArray, 1000, 0);
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      icon: [''],
      name: ['', Validators.required],
      duration: [''],
      grade: ['', Validators.required],
      grade_type: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      // trailer: [''],
      url: [''],
      tute_url: [''],
      discounted_price: ['', Validators.required],
      price: ['', Validators.required],
      package_view_count: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  // When a lesson is selected
  onLessonSelected() {
    this.selectedPaymentType = ''; // Reset payment type when selecting a new lesson
  }

  fetchAvailableLessons(filter: any, limit: number, skip: number) {
    this.lessonService.getAllLessons(filter, limit, skip).subscribe(
      (lessons: any) => {
        this.allLessons = lessons.data.results;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  private fetchLessonDetail() {
      this.id = this.route.snapshot.params.id;
      this.lessonService.getLessonById(this.id).subscribe(
        (data: any) => {
          this.lessonResponse = data.data;
          this.formGroup.patchValue({
            icon: this.lessonResponse.icon,
            name: this.lessonResponse.name,
            duration: this.lessonResponse.duration,
            description: this.lessonResponse.description,
            // trailer: this.lessonResponse.trailer,
            url: this.lessonResponse.url,
            tute_url: this.lessonResponse.tute_url,
            grade: this.lessonResponse.grade,
            grade_type: this.lessonResponse.grade_type,
            type: this.lessonResponse.type,
            discounted_price: this.lessonResponse.discounted_price,
            price: this.lessonResponse.price,
            package_view_count: this.lessonResponse.package_view_count,
            status: this.lessonResponse.status,
            // images: this.lessonResponse.images,
          });
          this.dataSource3 = new MatTableDataSource(
            this.lessonResponse.videoPackages || []
          );
          this.cdr.markForCheck();
        },
        (error) => {
          this.toastr.error('Failed to fetch lesson details.', 'Error');
        }
      );
    }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return "";
    }

    return "active";
  }

  save() {
   
    this.updateService({
      name: this.formGroup.get("name").value,
      duration: this.formGroup.get("duration").value,
      grade: this.formGroup.get("grade").value,
      grade_type: this.formGroup.get("grade_type").value,
      description: this.formGroup.get("description").value,
      type: this.formGroup.get("type").value,
      url: this.formGroup.get("url").value,
      tute_url: this.formGroup.get("tute_url").value,
      discounted_price: this.formGroup.get("discounted_price").value,
      price: this.formGroup.get("price").value,
      package_view_count: this.formGroup.get('package_view_count').value,
      status: this.formGroup.get("status").value,
    });
  }

  uploadFile(key, event) {

    if (key == "icon")
      this.formGroup.patchValue({
        icon: <File>event.target.files[0],
      });
    this.formGroup.get(key).updateValueAndValidity();
  }

  updateIcon() {
    const formData = new FormData();
    formData.append("icon", this.formGroup.get("icon").value);
    this.updateService(formData);
  }

  updateImages() {
    const formData = new FormData();
    this.selectedFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    this.lessonService.updateLessonImages(this.id, formData).subscribe(
      (response) => {
        this.toastr.success("Images updated successfully", "Success");
        this.fetchLessonDetail(); // Refresh the lesson details
        this.selectedFiles = [];
        this.imagesPreview = [];
      },
      (error) => {
        this.toastr.error("Failed to update images", "Error");
      }
    );
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.imagesPreview.splice(index, 1);
  }

  updateService(formData) {
    this.lessonService.updateLessonDetails(this.id, formData).subscribe(
      (data: any) => {
        this.lessonResponse = data.data;
        this.cdr.markForCheck();
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        } else {
          this.toastr.warning("Something Went Wrong", "Error!");
        }
      },
      (err) => {
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, "Error");
          this.toastr.error(JSON.stringify(err.error.errors), "Error");
        } else this.toastr.warning("Something Went Wrong", "Error!");
      }
    );
  }

  uploadFiles(key, event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach((file) => {
        this.selectedFiles.push(file);

        // Create a preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagesPreview.push(e.target.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  //Update Lessons if lesson type package

  // Add lesson to package
  addLessonToPackage() {
    if (!this.selectedLesson || !this.selectedPaymentType) return;

    const lesson = this.allLessons.find(lesson => lesson.id === this.selectedLesson);

    const newLesson = {
      video_id: this.selectedLesson,
      paid_type: this.selectedPaymentType
    };
    // Send API request to update the backend
    this.lessonService.addVideoPackageLesson(this.id, newLesson).subscribe(
      (data) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
          // Reset selection
          this.selectedLesson = null;
          this.selectedPaymentType = '';
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        }
      },
      (err) => {

        // if (err.error.message) {
        //   this.toastr.error(err.message, "Error");
        // }
        this.toastr.error(err.error.message, "Error");
      }
      // console.log(user)
    );

    
  }

  // Remove lesson package
  removeLessonPackage(packageId: number) {

    // Send API request to update the backend
    this.lessonService.removeVideoPackageLesson(packageId).subscribe(
      (data) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        }
      },
      (err) => {
        if (err.error.message) {
          this.toastr.error(err.error.message, "Error");
        }
      }
      // console.log(user)
    );

    
  }

  savePaidType(row: any) {
    row.isEdit = false;

    // Refresh the table
    this.dataSource3._updateChangeSubscription();
    // Update backend
    this.lessonService.updatePackagePaidType(row.id, row.paid_type).subscribe(
    (data) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        }
      },
      (err) => {
        if (err.error.message) {
          this.toastr.error(err.error.message, "Error");
        }
      }
    )
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid2(controlName: string): boolean {
    const control = this.formGroup2.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid2(controlName: string): boolean {
    const control = this.formGroup2.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

}
