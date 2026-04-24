import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LayoutService } from 'src/app/_metronic/core';
import { OptionService } from '../../after-al-management/option-management/service/option.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlSquadPostService } from '../service/al-squad-post.service';

@Component({
  selector: 'app-edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.scss']
})
export class EditPollComponent implements OnInit {

  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  id: any;
  postResponse: any;
  vodEnrollObj: any;
  submitting = false;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;
  vimeo_iframe_html: any;

  displayedColumns2: string[] = [
    "id",
    "video_id",
    "video_price",
    "video",
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

  instituteObj: any;
  categoryObj: any;

  constructor(
    private layout: LayoutService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public alSquadPostService: AlSquadPostService,
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.id = this.route.snapshot.params.id;
    this.alSquadPostService.getPollById(this.id).subscribe((data: any) => {
      console.log(data);
      this.postResponse = data.data;
      this.cdr.markForCheck();
    });
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

  ngAfterViewInit() {}
}
