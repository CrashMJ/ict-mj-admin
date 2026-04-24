import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FailSubscriptionService } from '../services/failSubscription.Service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation-retry',
  templateUrl: './confirmation-retry.component.html',
  styleUrls: ['./confirmation-retry.component.scss']
})
export class ConfirmationRetryComponent implements OnInit {

  @Input() id;
  constructor(
    public modal: NgbActiveModal,
    public failSubscriptionService: FailSubscriptionService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  retry() {
    console.log('ID: ',this.id)
    let retryObj = {
      "subscription_ids": [this.id]
    }
      this.failSubscriptionService.retryfailSubscription(retryObj).subscribe(data => {
        this.modal.close();
        this.toastr.success(JSON.stringify(data));
      },
        err => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, 'Error');
          }
          else
            this.toastr.warning('Something Went Wrong', 'Error!')
        });
}

close(){

}
}
