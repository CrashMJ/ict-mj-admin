import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { UserModel } from "src/app/modules/auth";
import { StudentService } from "../services/student.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SubjectService } from "../../subject-management/services/subject.service";
import { districts } from "src/config/districts.config";
import { environment } from "src/environments/environment";
import { VodEnrollService } from "../../vod-enrollments/services/vod-enroll.service";
import { VodSubscriptionService } from "../../vod-subscriptions/services/vod-subscription.service";

@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
  styleUrls: ["./edit-student.component.scss"],
})
export class EditStudentComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroupNic: FormGroup;
  user: UserModel;
  studentResponse: any;
  id: any;
  subjectObj: any;
  districts = districts;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;
  fileToUpload: File = null;
  nicFrontPreview: string | null = null;
  nicBackPreview: string | null = null;
  zoomImage: string | null = null;
  isZoomModalOpen: boolean = false;

  displayedColumns2: string[] = [
    "id",
    "video_id",
    "video_price",
    "video_code",
    "student_id",
    "name",
    "email",
    "phone",
    "status",
    "created_at",
    "action",
  ];
  dataSource2: any;
  pagination_item_counts2 = environment.pagination_item_counts;
  pagination_data2 = environment.pagination_data;
  vodEnrollObj: any;

  displayedColumns3: string[] = [
    "id",
    "name",
    "phone",
    "recurring_amount",
    "payment_method",
    "status",
    "created_at",
    "action",
  ];
  dataSource3: any;
  pagination_item_counts3 = environment.pagination_item_counts;
  pagination_data3 = environment.pagination_data;
  vodSubsObj: any;

  displayedColumns4: string[] = [
    "id",
    "deviceUUId",
    "deviceId",
    "browser",
    "os",
    "deviceType",
    "deviceStatus",
    "createdAt",
  ];

  dataSource4: any;
  pagination_item_counts4 = environment.pagination_item_counts;
  pagination_data4 = JSON.parse(JSON.stringify(environment.pagination_data));
  moduleObj: any;

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private subjectService: SubjectService,
    private vodEnrollService: VodEnrollService,
    private vodSubscriptionService: VodSubscriptionService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getSubjects([{ status: "ACTIVE" }], 1000, 0);
    this.getEnrolls([{ studentid: this.id }], this.pagination_data2.limit, 0);
    this.getSubs([{ studentid: this.id }], this.pagination_data3.limit, 0);
    this.getDevices( this.id , this.pagination_data4.limit, 0);
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      nic: ["", [this.nicValidator()]],
      address: ["", Validators.required],
      district: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      school: ["", Validators.compose([Validators.required])],
      status: ["", Validators.compose([Validators.required])],
      is_phone_verified: ["", Validators.compose([Validators.required])],
      class_grade: ["", Validators.compose([Validators.required])],
      class_type: [""],
      location: [null],
      // location: ["", Validators.compose([Validators.required])],
    });

    this.formGroup.get('class_type').valueChanges.subscribe((val) => {
      if (val === 'physical') {
        this.formGroup.addControl('location', new FormControl('', Validators.required));
      } else {
        this.formGroup.removeControl('location');
      }
    });

    this.formGroup2 = this.fb.group({
      newPassword: ["", Validators.required],
    });
    this.formGroup3 = this.fb.group({
      image: ["", Validators.required],
    });

    this.formGroupNic = this.fb.group({
      nic_front: ["", Validators.required],
      nic_back: ["", Validators.required],
    });

    this.studentService.getStudentById(this.id).subscribe(
      (data: any) => {
        console.log('data.data.user',typeof(data.data.user.is_phone_verified))
        this.studentResponse = data.data.user;
        console.log('studentdata',  this.studentResponse)
        const verifyValue = this.studentResponse.is_phone_verified === true ? 'true' : 'false';
        setTimeout(() => {
    this.formGroup.patchValue({
      fname: this.studentResponse.fname,
      lname: this.studentResponse.lname,
      image: this.studentResponse.image,
      nic: this.studentResponse.nic,
      address: this.studentResponse.address,
      phone: this.studentResponse.phone,
      email: this.studentResponse.email,
      district: this.studentResponse.district,
      school: this.studentResponse.school,
      class_grade: this.studentResponse.class_grade,
      class_type: this.studentResponse.class_type,
      location: this.studentResponse.location,
      status: this.studentResponse.status,
      is_phone_verified: verifyValue
    });
    
    this.nicFrontPreview =
    this.STORAGE_BUCKET + this.studentResponse.nic_front;

  this.nicBackPreview =
    this.STORAGE_BUCKET + this.studentResponse.nic_back;

    this.formGroup3.patchValue({
      image: this.studentResponse.image
    });

    this.formGroupNic.patchValue({
      nic_front: this.STORAGE_BUCKET + this.studentResponse.nic_front,
      nic_back: this.STORAGE_BUCKET + this.studentResponse.nic_back,
    });
  });
      },
      (error) => {}
    );
  }

  nicValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // allow empty NIC
      }
      const validNicPattern = /^(\d{12}|\d{9}[Vv])$/;
      const valid = validNicPattern.test(control.value);
      return valid ? null : { invalidNic: true };
    };
  }

  getEnrolls(filter: any, limit: number, skip: number) {
    this.vodEnrollService.getVodEnroll(filter, limit, skip).subscribe(
      (list: any) => {
        this.vodEnrollObj = list.data.results;
        this.pagination_data2.total = list.data.pagination.total;
        this.dataSource2 = this.vodEnrollObj;

        this.cdr.markForCheck();
        console.log(this.dataSource2);
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  getSubs(filter: any, limit: number, skip: number) {
    this.vodSubscriptionService
      .getVodSubscription(filter, limit, skip)
      .subscribe(
        (list: any) => {
          this.vodSubsObj = list.data.results;
          this.pagination_data3.total = list.data.pagination.total;
          this.dataSource3 = this.vodSubsObj;

          this.cdr.markForCheck();
          console.log(this.dataSource3);
        },
        (error) => {
          // this.toastr.warning("Something went wrong.", "Error!");
          console.log(error); // The error is here
        }
      );
  }

  getSubjects(filter: any, limit: number, skip: number) {
    this.subjectService.getAllSubject(filter, limit, skip).subscribe(
      (teacherList: any) => {
        this.subjectObj = teacherList.data.results;
        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  getDevices(filter: any, limit: number, skip: number) {
    this.studentService.getStudentDevices(filter, limit, skip).subscribe(
      (deviceList: any) => {
        console.log('deviceList',deviceList)
        this.moduleObj = deviceList.data.results;
        this.pagination_data4.total = deviceList.data.pagination.total;
        this.dataSource4 = deviceList.data.results;

        this.cdr.markForCheck();
        console.log(this.dataSource4);
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
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

  save() {
    console.log('this.formGroup.get("is_phone_verified").value == true ? true :  false',this.formGroup.get("is_phone_verified").value )
    this.updateService({
      fname: this.formGroup.get("fname").value,
      lname: this.formGroup.get("lname").value,
      nic: this.formGroup.get("nic").value,
      email: this.formGroup.get("email").value,
      phone: this.formGroup.get("phone").value,
      address: this.formGroup.get("address").value,
      district: this.formGroup.get("district").value,
      school: this.formGroup.get("school").value,
      status: this.formGroup.get("status").value,
      is_phone_verified: this.formGroup.get("is_phone_verified").value === 'true',
      class_grade: this.formGroup.get("class_grade").value == 'ol' ? 'ol' : 'al',
      class_type: this.formGroup.get("class_type").value == 'physical' ? 'physical' : 'online',
      location: this.formGroup.get("location") ? this.formGroup.get("location").value : '',
    });
  }

  uploadFile(key, event) {
    if (key == "image")
      this.formGroup3.patchValue({
        image: <File>event.target.files[0],
      });
    this.formGroup3.get(key).updateValueAndValidity();
  }

  updateProfileBanner() {
    const formData = new FormData();
    formData.append("image", this.formGroup3.get("image").value);
    this.updateService(formData);
  }

  updatePassword() {
    this.updateService2({
      newPassword: this.formGroup2.get("newPassword").value,
    });
  }

  updateService2(formData) {
    this.studentService.updateStudentPassword(formData, this.id).subscribe(
      (data: any) => {
        console.log(data)
        // this.studentResponse = data.data;
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

  updateService(formData) {
    this.studentService.updateStudentDetails(formData, this.id).subscribe(
      (data: any) => {
        this.studentResponse = data.data;
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
  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }
    // return `url('${this.user.pic}')`;
  }

  deletePic() {
    this.user.pic = "";
  }

  openZoom(imgUrl: string) {
    this.zoomImage = imgUrl;
    this.isZoomModalOpen = true;
  }

  closeZoom() {
    this.isZoomModalOpen = false;
    this.zoomImage = null;
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

  isControlValid3(controlName: string): boolean {
    const control = this.formGroup3.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid3(controlName: string): boolean {
    const control = this.formGroup3.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  pageEvent2(event: any) {
    this.pagination_data2.limit = event.pageSize;
    this.pagination_data2.pageIndex = event.pageIndex;
    this.getEnrolls(
      [{ studentid: this.id }],
      event.pageSize,
      event.pageIndex * event.pageSize
    );
  }

  pageEvent3(event: any) {
    this.pagination_data3.limit = event.pageSize;
    this.pagination_data3.pageIndex = event.pageIndex;
    this.getSubs(
      [{ studentid: this.id }],
      event.pageSize,
      event.pageIndex * event.pageSize
    );
  }

  pageEvent4(event: any) {
    this.pagination_data4.limit = event.pageSize;
    this.pagination_data4.pageIndex = event.pageIndex;
    this.getDevices(this.id, event.pageSize, event.pageIndex);
  }
}
