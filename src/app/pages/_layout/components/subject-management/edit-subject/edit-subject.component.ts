import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { SubjectService } from "../services/subject.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { VideoService } from "../../video-management/services/video.service";
import { TeacherService } from "../../teacher-management/services/teacher.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CourseModelComponent } from "../course-model/model.component";
import { ClassModelComponent } from "../class-model/model.component";
import { DeleteModelComponent } from "../../shared/delete-model/delete-model.component";
import { MaterialModelComponent } from "../material-model/model.component";

@Component({
  selector: "app-edit-subject",
  templateUrl: "./edit-subject.component.html",
  styleUrls: ["./edit-subject.component.scss"],
})
export class EditSubjectComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  subjectResponse: any;
  id: any;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;
  fileToUpload: File = null;

  // videos
  displayedColumns1: string[] = [
    "id",
    "title",
    "start_date",
    "start_time",
    "session_type",
    "created_at",
    "action",
  ];
  dataSource1: any;
  pagination_item_counts1 = environment.pagination_item_counts;
  pagination_data1 = JSON.parse(JSON.stringify(environment.pagination_data));
  videoObj: any;

  // teachers
  displayedColumns4: string[] = [
    "id",
    "name_en",
    "title_tag_en",
    "module_code",
    "created_at",
    "action",
  ];
  displayedColumns3: string[] = [
    "id",
    "title",
    "description",
    "type",
    "module_code",
    "file",
    "created_at",
    "action",
  ];
  dataSource4: any;
  dataSource3: any;
  pagination_item_counts4 = environment.pagination_item_counts;
  pagination_item_counts3 = environment.pagination_item_counts;
  pagination_data4 = JSON.parse(JSON.stringify(environment.pagination_data));
  pagination_data3 = JSON.parse(JSON.stringify(environment.pagination_data));
  moduleObj: any;
  classObj: any;
  materialObj: any;

  constructor(
    private modalService: NgbModal,
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public videoService: VideoService,
    public teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      name_sn: ["", Validators.required],
      name_en: ["", Validators.required],
      course_code: ["", Validators.required],
      class_grade: ["", Validators.required],
      language: ["", Validators.required],
      class_delivery_type: ["", Validators.required],
      class_year: ["", Validators.required],
      class_date_en: ["", Validators.required],
      class_time: ["", Validators.required],
      course_fee: ["", Validators.required],
      description_1_en: [""],
      description_1_sn: [""],
      description_2_en: [""],
      description_2_sn: [""],
      description_3_en: [""],
      description_3_sn: [""],
    });
    this.formGroup2 = this.fb.group({
      image: ["", Validators.required],
    });
    this.id = this.route.snapshot.params.id;
    this.subjectService.getSubjectById(this.id).subscribe(
      (data: any) => {
        this.subjectResponse = data.data;
        this.formGroup.get("name_sn").setValue(this.subjectResponse.name_sn);
        this.formGroup.get("name_en").setValue(this.subjectResponse.name_en);
        this.formGroup
          .get("course_code")
          .setValue(this.subjectResponse.course_code);
        this.formGroup
          .get("class_grade")
          .setValue(this.subjectResponse.class_grade);
        this.formGroup.get("language").setValue(this.subjectResponse.language);
        this.formGroup
          .get("class_delivery_type")
          .setValue(this.subjectResponse.class_delivery_type);
        this.formGroup
          .get("class_year")
          .setValue(this.subjectResponse.class_year);
        this.formGroup
          .get("class_date_en")
          .setValue(this.subjectResponse.class_date_en);
        this.formGroup
          .get("class_time")
          .setValue(this.subjectResponse.class_time);
        this.formGroup
          .get("course_fee")
          .setValue(this.subjectResponse.course_fee);
        this.formGroup
          .get("description_1_en")
          .setValue(this.subjectResponse.description_1_en);
        this.formGroup
          .get("description_1_sn")
          .setValue(this.subjectResponse.description_1_sn);
        this.formGroup
          .get("description_2_en")
          .setValue(this.subjectResponse.description_2_en);
        this.formGroup
          .get("description_2_sn")
          .setValue(this.subjectResponse.description_2_sn);
        this.formGroup
          .get("description_3_en")
          .setValue(this.subjectResponse.description_3_en);
        this.formGroup
          .get("description_3_sn")
          .setValue(this.subjectResponse.description_3_sn);

        console.log(this.subjectResponse);
      },
      (error) => {
        console.log(error);
      }
    );
    this.filterModule(this.id, this.pagination_data4.limit, 0);
    this.filterClass(this.id, this.pagination_data1.limit, 0);
    this.filterMaterial(this.id, this.pagination_data3.limit, 0);
  }

  filterModule(filter: any, limit: number, skip: number) {
    this.subjectService.filterModule(filter, limit, skip).subscribe(
      (teacherList: any) => {
        this.moduleObj = teacherList.data.results;
        this.pagination_data4.total = teacherList.data.pagination.total;
        this.dataSource4 = teacherList.data.results;

        this.cdr.markForCheck();
        console.log(this.dataSource4);
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  filterClass(filter: any, limit: number, skip: number) {
    this.subjectService.filterClass(filter, limit, skip).subscribe(
      (dataList: any) => {
        this.classObj = dataList.data.results;
        this.pagination_data1.total = dataList.data.pagination.total;
        this.dataSource1 = dataList.data.results;

        this.cdr.markForCheck();
        console.log(this.dataSource1);
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  filterMaterial(filter: any, limit: number, skip: number) {
    this.subjectService.filterMaterial(filter, limit, skip).subscribe(
      (dataList: any) => {
        this.materialObj = dataList.data.results;
        this.pagination_data3.total = dataList.data.pagination.total;
        this.dataSource3 = this.materialObj;
        console.log(this.pagination_data3);
        this.cdr.markForCheck();
        console.log(this.dataSource3);
        console.log(this.pagination_data3, this.pagination_data1, this.pagination_data4);
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  updateService(formData: any) {
    this.subjectService.updateSubjectDetails(formData, this.id).subscribe(
      (data: any) => {
        this.subjectResponse = data.data;
        this.cdr.markForCheck();
        console.log(this.subjectResponse);
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

  deleteClass(id: any) {
    const modalRef = this.modalService.open(DeleteModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = "Class";
    modalRef.componentInstance.value = name;

    modalRef.result.then(
      () =>
        this.filterClass(
          this.id,
          this.pagination_data4.limit,
          this.pagination_data4.pageIndex
        ),
      () => {}
    );
  }

  deleteModule(id: any) {
    const modalRef = this.modalService.open(DeleteModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = "Module";
    modalRef.componentInstance.value = name;

    modalRef.result.then(
      () =>
        this.filterModule(
          this.id,
          this.pagination_data4.limit,
          this.pagination_data4.pageIndex
        ),
      () => {}
    );
  }

  deleteMaterial(id: any) {
    const modalRef = this.modalService.open(DeleteModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = "Material";
    modalRef.componentInstance.value = name;

    modalRef.result.then(
      () =>
        this.filterMaterial(
          this.id,
          this.pagination_data3.limit,
          this.pagination_data3.pageIndex
        ),
      () => {}
    );
  }

  uploadFile(key, event) {
    this.formGroup2.patchValue({
      image: <File>event.target.files[0],
    });
    this.formGroup2.get(key).updateValueAndValidity();
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

  resetPreview(): void {
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.layout.setConfig(this.model);
    location.reload();
  }

  ngAfterViewInit() {
    // init code preview examples
    // see /src/assets/js/layout/extended/examples.js
    const elements = this.el.nativeElement.querySelectorAll(".example");
    // KTLayoutExamples.init(elements);
  }

  updateImage() {
    const formData = new FormData();
    formData.append("icon", this.formGroup2.get("image").value);
    this.updateService(formData);
  }

  save() {
    const formData = new FormData();
    formData.append("name_sn", this.formGroup.get("name_sn").value);
    formData.append("name_en", this.formGroup.get("name_en").value);
    formData.append("class_date_en", this.formGroup.get("class_date_en").value);
    formData.append("course_code", this.formGroup.get("course_code").value);
    formData.append("class_grade", this.formGroup.get("class_grade").value);
    formData.append("language", this.formGroup.get("language").value);
    formData.append(
      "class_delivery_type",
      this.formGroup.get("class_delivery_type").value
    );
    formData.append("class_year", this.formGroup.get("class_year").value);
    formData.append("class_time", this.formGroup.get("class_time").value);
    formData.append("course_fee", this.formGroup.get("course_fee").value);
    formData.append(
      "description_1_en",
      this.formGroup.get("description_1_en").value
    );
    formData.append(
      "description_1_sn",
      this.formGroup.get("description_1_sn").value
    );
    formData.append(
      "description_2_en",
      this.formGroup.get("description_2_en").value
    );
    formData.append(
      "description_2_sn",
      this.formGroup.get("description_2_sn").value
    );
    formData.append(
      "description_3_en",
      this.formGroup.get("description_3_en").value
    );
    formData.append(
      "description_3_sn",
      this.formGroup.get("description_3_sn").value
    );

    this.updateService(formData);
  }

  addNewModule() {
    const modalRef = this.modalService.open(CourseModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then(
      () => this.filterModule(this.id, this.pagination_data4.limit, 0),
      () => {}
    );
  }

  addNewClass() {
    const modalRef = this.modalService.open(ClassModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then(
      () => this.filterClass(this.id, this.pagination_data1.limit, 0),
      () => {}
    );
  }


  editClass(classId:any) {
    const modalRef = this.modalService.open(ClassModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.classId = classId;
    modalRef.result.then(
      () => this.filterClass(this.id, this.pagination_data1.limit, 0),
      () => {}
    );
  }

  editModule(moduleId:any) {
    const modalRef = this.modalService.open(CourseModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.moduleId = moduleId;
    modalRef.result.then(
      () => this.filterModule(this.id, this.pagination_data1.limit, 0),
      () => {}
    );
  }

  editMaterial(materialId:any) {
    const modalRef = this.modalService.open(MaterialModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.materialId = materialId;
    modalRef.result.then(
      () => this.filterMaterial(this.id, this.pagination_data1.limit, 0),
      () => {}
    );
  }

  addNewMaterial() {
    const modalRef = this.modalService.open(MaterialModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then(
      () => this.filterMaterial(this.id, this.pagination_data3.limit, 0),
      () => {}
    );
  }

  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }
    // return `url('${this.user.pic}')`;
  }

  deletePic() {
    // this.user.pic = '';
  }

  pageEvent1(event: any) {
    this.pagination_data1.limit = event.pageSize;
    this.pagination_data1.pageIndex = event.pageIndex;
    this.filterClass(this.id, event.pageSize, event.pageIndex);
  }

  pageEvent4(event: any) {
    this.pagination_data4.limit = event.pageSize;
    this.pagination_data4.pageIndex = event.pageIndex;
    this.filterModule(this.id, event.pageSize, event.pageIndex);
  }

  pageEvent3(event: any) {
    this.pagination_data3.limit = event.pageSize;
    this.pagination_data3.pageIndex = event.pageIndex;
    this.filterMaterial(this.id, event.pageSize, event.pageIndex);
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }
}
