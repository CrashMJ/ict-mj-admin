import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateConfService } from './update-conf-model.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modules/ngbootstrap/modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-conf-model',
  templateUrl: './update-conf-model.component.html',
  styleUrls: ['./update-conf-model.component.scss']
})
export class UpdateConfModelComponent implements OnInit {
  // id:any;

  @Input() id;
  @Input() value;
  @Input() type;
  constructor(
    public modal: NgbActiveModal,
    public updateConfService: UpdateConfService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  process() {
    if (this.type == 'Select & Save Quiz Winner') {
      this.updateConfService.updateWinner(this.id).subscribe(data => {
        this.modal.close();
        this.toastr.success("Winner successfully selected");
      },
      err=>{
        if(err.error && err.error.message){
          this.toastr.error(err.error.message, 'Error');
        }
        else
          this.toastr.warning('Something Went Wrong', 'Error!')
      })
    }

  }

  close() {
    this.modal.close();
  }
}
