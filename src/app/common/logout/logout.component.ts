import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private authservice: AuthonticationService, private route: Router) {

  }
  ngOnInit() {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authservice.logout();
        this.route.navigate(['login']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the cancellation action if needed
      }
    });
  }
}
