import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteService } from "./delete.service";
import { MatDialogRef } from "@angular/material/dialog";
import { ModalComponent } from "src/app/modules/ngbootstrap/modal/modal.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-delete-model",
  templateUrl: "./delete-model.component.html",
  styleUrls: ["./delete-model.component.scss"],
})
export class DeleteModelComponent implements OnInit {
  // id:any;

  @Input() id;
  @Input() value;
  @Input() type;
  constructor(
    public modal: NgbActiveModal,
    public deleteService: DeleteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  delete() {
    console.log('this.type final', this.type)

    if (this.type == "Course") {
      this.deleteService.deleteSubject(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Course deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Assignment") {
      this.deleteService.deleteAssignment(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Assignment deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Student") {
      this.deleteService.deleteStudent(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Student deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Admin") {
      this.deleteService.deleteAdmin(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Admin deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Class") {
      this.deleteService.deleteClass(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Class deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Module") {
      this.deleteService.deleteModule(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Module deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Material") {
      this.deleteService.deleteMaterial(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Material deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Other Resource") {
      this.deleteService.deleteOR(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Other Resource deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Banner") {
      this.deleteService.deleteBanner(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Banner deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "FAQ") {
      this.deleteService.deleteTip(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("FAQ deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Review") {
      this.deleteService.deleteReview(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Review deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "INQUIRY") {
      this.deleteService.deleteInq(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Inquiry deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Contact Us") {
      this.deleteService.deleteContactus(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success("Contact Message deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Payment") {
      this.deleteService.deletePayment(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success(this.type + " deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Free Card") {
      this.deleteService.deleteFreeCard(this.id).subscribe(
        (data) => {
          this.modal.close();
          this.toastr.success(this.type + " deleted successfully");
        },
        (err) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, "Error");
          } else this.toastr.warning("Something Went Wrong", "Error!");
        }
      );
    } else if (this.type == "Medal") {
      this.deleteService.deleteMedal(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Video Comment") {
      this.deleteService.deleteVideoComment(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Setting") {
      this.deleteService.deleteSetting(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Institute") {
      this.deleteService.deleteInstitute(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Category") {
      this.deleteService.deleteCategory(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Option") {
      this.deleteService.deleteOptions(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Campus Contact") {
      this.deleteService.deleteCampusContact(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Live Enrollment") {
      this.deleteService.deleteLiveEnrollement(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Live Class") {
      this.deleteService.deleteLiveClass(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Live Purchase") {
      this.deleteService.deleteLivePurchase(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Squad Comment") {
      this.deleteService.deleteSquadPostComment(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Squad Post") {
      this.deleteService.deleteSquadPost(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    } else if (this.type == "Lesson") {
      this.deleteService.deleteLesson(this.id).subscribe((data) => {
        this.modal.close();
        this.toastr.success(this.type + " deleted successfully");
      });
    }
  }

  close() {
    this.modal.close();
  }
}
