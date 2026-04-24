import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LayoutService } from 'src/app/_metronic/core';
import { FormBuilder } from '@angular/forms';
import { FailSubscriptionService } from '../services/failSubscription.Service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationRetryComponent } from '../confirmation-retry/confirmation-retry.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-fail-subscriptions',
  templateUrl: './edit-fail-subscriptions.component.html',
  styleUrls: ['./edit-fail-subscriptions.component.scss']
})
export class EditFailSubscriptionsComponent implements OnInit {
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
    private failSubscriptionService: FailSubscriptionService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.id = this.route.snapshot.params.id;
    this.failSubscriptionService.getfailSubscription([{id: this.id}],1,0).subscribe(
      (data: any) => {
        this.payLog = data.data.results[0];
        console.log("asad,",this.payLog);
        this.log = this.payLog;
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

  retryFail(){
    console.log("delete")
    const modalRef = this.modalService.open(ConfirmationRetryComponent, { size: 'lg' });
    modalRef.componentInstance.id = this.id;
  }


}
