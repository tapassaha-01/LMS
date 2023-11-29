import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaternityLeaveRequest } from 'src/app/models/maternity-leave-request';
import { WfhRequest } from 'src/app/models/wfh-request';
import { MaternityServiceService } from 'src/app/services/maternity-service.service';
import { WfhRequestService } from 'src/app/services/wfh-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maternity-dialogue-cancel',
  templateUrl: './maternity-dialogue-cancel.component.html',
  styleUrls: ['./maternity-dialogue-cancel.component.css']
})
export class MaternityDialogueCancelComponent {
  draftCancelRequest:MaternityLeaveRequest={
  }

  constructor(@Inject(MAT_DIALOG_DATA) public dataf: string,
    private maternityReqServ: MaternityServiceService,
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
    this.maternityReqServ.submitCancelRequest(this.draftCancelRequest).subscribe(
      data => {
        
      });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the cancellation action if needed
      }
      location.reload();
    });
  }
}
