import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WfhRequest } from 'src/app/models/wfh-request';
import { WfhRequestService } from 'src/app/services/wfh-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-cancel',
  templateUrl: './dialog-cancel.component.html',
  styleUrls: ['./dialog-cancel.component.css']
})
export class DialogCancelComponent {
  draftCancelRequest: WfhRequest = {};

  constructor(@Inject(MAT_DIALOG_DATA) public dataf: string,
    private wfhReqServ: WfhRequestService,
    private _snackBar: MatSnackBar) {

  }
  onSubmit() {
    Swal.fire({
      title: 'Do You want to Cancel Your Leave!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.draftCancelRequest.id = this.dataf;
    this.wfhReqServ.submitCancelRequest(this.draftCancelRequest).subscribe(
      data => {
        
      });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the cancellation action if needed
      }
      location.reload();
    });
  }
    
}
