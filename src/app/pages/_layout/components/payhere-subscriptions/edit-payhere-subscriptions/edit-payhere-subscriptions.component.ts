import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LayoutService } from 'src/app/_metronic/core';
import { FormBuilder } from '@angular/forms';
import { PayhereSubscriptionService } from '../services/payhereSubscription.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-payhere-subscriptions',
  templateUrl: './edit-payhere-subscriptions.component.html',
  styleUrls: ['./edit-payhere-subscriptions.component.scss']
})
export class EditPayhereSubscriptionsComponent implements OnInit {
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
    private payhereSubscriptionService: PayhereSubscriptionService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();

    this.id = this.route.snapshot.params.id;
    this.payhereSubscriptionService.getPayhereSubscription([{id: this.id}],1,0).subscribe(
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



}
