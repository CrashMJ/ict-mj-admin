import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { LessonService } from "../services/lesson.service";
import { SubjectService } from "../../subject-management/services/subject.service";

@Component({
  selector: "app-lesson-model",
  templateUrl: "./lesson-model.component.html",
  styleUrls: ["./lesson-model.component.scss"],
})
export class LessonModelComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  formGroup: FormGroup;
  // private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  // subjectObj: any;
  searchArray: any = {"status": 'active', "type": 'individual'};
  availableLessons: any[] = [];
  selectedLessons: { [key: string]: { video_id: number; paid_type: string } } = {};

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public lessonService: LessonService,
    private cdr: ChangeDetectorRef,
    // private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      type: ["", Validators.required],
      grade: ["", Validators.required],
      grade_type: ["", Validators.required],
      price: ["", Validators.required],
      days: ["", Validators.required],
      icon: [""],
      description: [""],
      url: [""],
      tute_url: [""],
      // trailer: [""],
      discounted_price: [""],
      package_view_count: [""],
      duration: [""],
    });

    this.fetchAvailableLessons(this.searchArray, 1000, 0);

    // Watch for changes in the 'type' control
    this.formGroup.get('type').valueChanges.subscribe((value) => {
      if (value === 'package') {
        this.formGroup.get('lessons').setValidators([Validators.required]);
      } else {
        // Clear the selected lessons when switching to 'individual'
        this.selectedLessons = {};
        this.formGroup.get('lessons').clearValidators();
        this.cdr.detectChanges(); // Trigger change detection to update the UI
      }
      this.formGroup.get('lessons').updateValueAndValidity();
    });

  }

  fetchAvailableLessons(filter: any, limit: number, skip: number) {
    console.log('Fetching lessons with filter:', filter);
    this.lessonService.getAllLessons(filter, limit, skip).subscribe(
      (lessons: any) => {
        console.log('lessons', lessons)
        this.availableLessons = lessons.data.results;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  // Add this method to handle lesson selection
  onLessonSelect(event: any, lesson: any) {
    const lessonId = lesson.id;
    if (event.target.checked) {
      this.selectedLessons[lessonId] = { video_id: lessonId, paid_type: 'paid' }; // Default to 'paid'
    } else {
      delete this.selectedLessons[lessonId];
    }
  }

  // Add this method to check if a lesson is selected
  isLessonSelected(lessonId: string): boolean {
    return !!this.selectedLessons[lessonId];
  }

  save() {
    const formData = new FormData();
    formData.append("name", this.formGroup.get("name").value);
    formData.append("icon", this.formGroup.get("icon").value);
    formData.append("description", this.formGroup.get("description").value);
    formData.append("type", this.formGroup.get("type").value);
    formData.append("grade", this.formGroup.get("grade").value);
    formData.append("grade_type", this.formGroup.get("grade_type").value);
    formData.append("url", this.formGroup.get("url").value);
    formData.append("tute_url", this.formGroup.get("tute_url").value);
    formData.append("trailer", '');
    formData.append("discounted_prie", this.formGroup.get("discounted_price").value);
    formData.append("price", this.formGroup.get("price").value);
    formData.append("duration", this.formGroup.get("duration").value);
    formData.append("days", this.formGroup.get("days").value);

    if (this.formGroup.get('type').value === 'package') {
      const lessonsWithPaidType = Object.values(this.selectedLessons);
      formData.append("videoPackages", JSON.stringify(lessonsWithPaidType));
      formData.append("package_view_count", this.formGroup.get("package_view_count").value);
    }

    this.lessonService.createLesson(formData).subscribe(
      (data) => {
        console.log(data.statusCode);
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
          this.modal.close("Close click");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        }
      },
      (err) => {
        if (err.error.message) {
          this.toastr.error(err.message, "Error");
        }
        this.toastr.error(JSON.stringify(err.error), "Error");
      }
      // console.log(user)
    );
  }

  uploadFile(key, event) {
    this.formGroup.patchValue({
      icon: <File>event.target.files[0],
    });
    this.formGroup.get(key).updateValueAndValidity();
  }

  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }
    // return `url('${this.user.pic}')`;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  deletePic() {
    // this.user.pic = '';
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
