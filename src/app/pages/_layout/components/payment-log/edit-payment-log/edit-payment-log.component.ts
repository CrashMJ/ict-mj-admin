import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PaymentLogService } from "../services/payment-log.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-edit-payment-log",
  templateUrl: "./edit-payment-log.component.html",
  styleUrls: ["./edit-payment-log.component.scss"],
})
export class EditPaymentLogComponent implements OnInit {
  model: any;

  activeTabId = 1;

  id: any;
  payLog: any;
  log: any = {};
  fileToUpload: File = null;

  submitting = false;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private paymentLogService: PaymentLogService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();

    this.id = this.route.snapshot.params.id;
    this.paymentLogService.getPaymentById(this.id).subscribe(
      (data: any) => {
        this.payLog = data.data;
        console.log(this.payLog);
        this.log = this.payLog.payload ? JSON.parse(this.payLog.payload) : {};
        console.log(this.log);
      },
      (error) => {
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


}
