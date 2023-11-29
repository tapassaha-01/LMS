import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogue-cancel',
  templateUrl: './dialogue-cancel.component.html',
  styleUrls: ['./dialogue-cancel.component.css']
})
export class DialogueCancelComponent {

  draftCancelRequest: LeaveRequest = {};

  constructor(@Inject(MAT_DIALOG_DATA) public dataf: string,
    private leaveReqServ: LeaveRequestService,
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
    this.leaveReqServ.submitCancelRequest(this.draftCancelRequest).subscribe(
      data => {
        
      });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the cancellation action if needed
      }
      location.reload();
    });
  }
    
  }

  // openSuceessBar() {
  //   Swal.fire({
  //     title: 'Do You want to Cancel Your Leave!',
  //     icon: 'info',
  //     showCancelButton:true,
  //     confirmButtonText: 'OK',
  //     cancelButtonText: 'Cancel'
  //   }).then(() => {
  //     location.reload(); // Reload the page
  //   });
  // }



