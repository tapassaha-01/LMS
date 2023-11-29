import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangePassDialogueComponent } from 'src/app/change-pass-dialogue/change-pass-dialogue.component';
import { Breadcrumb } from 'src/app/models/breadcrumb.model';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import Swal from 'sweetalert2';
import { CommonServiceService } from 'src/app/shared/common-service.service';



@Component({
  selector: 'app-menu-side-bar',
  templateUrl: './menu-side-bar.component.html',
  styleUrls: ['./menu-side-bar.component.scss']
})
export class MenuSideBarComponent {

  constructor(public dialog: MatDialog, public authService: AuthonticationService,
    private commonService: CommonServiceService, private router: Router
  ) { }

  isExpanded:boolean=true
  openSidenav: boolean | undefined;
  mode: any
  showToggle: string | undefined;
  profileImageSrc: string = 'assets/user.png';
  firstName: string = ''
  lastName: string = ''
  private screenWidth$ = new BehaviorSubject<number>
    (window.innerWidth);

  @ViewChild('sidenav') matSidenav: any = MatSidenav;

  pageHeading: string | null = null;

  showManageEmployeeMenu = false;
  isManageEmployeeExpanded = false;

  breadcrumb: Breadcrumb | null = {
    bcName: "",
    bcCurrent: false,
    bcRouterLink: ""
  };

  @ViewChild('LMS_drawer_icon')
  drawer1!: MatDrawer;
  @ViewChild('LMS_drawer') drawer2!: MatDrawer;

  isDrawer1Open = false;

  toggleDrawers() {
    if (this.isDrawer1Open) {
      this.drawer1.close();
      this.drawer2.open();
    } else {
      this.drawer1.open();
      this.drawer2.close();
    }
    this.isDrawer1Open = !this.isDrawer1Open;
  }

  toggleManageEmployeeMenu() {
    this.isManageEmployeeExpanded = !this.isManageEmployeeExpanded
    this.showManageEmployeeMenu = !this.showManageEmployeeMenu;
  }

  ngOnInit() {
    this.getScreenWidth().subscribe((width: number) => {
      if (width < 640) {
        this.showToggle = 'show';
        this.mode = 'over';
        this.openSidenav = false;
      }
      else if (width > 640) {
        this.showToggle = 'hide';
        this.mode = 'side';
        this.openSidenav = true;
      }
    });

    // decide what to do when this event is triggered.
    this.router.events.subscribe(val => {
      console.log("nav", val.type)
      if (val.type == 0) {
        this.breadcrumb = {
          bcName: "",
          bcCurrent: false,
          bcRouterLink: ""
        };
        this.pageHeading = "";
      }
    });

    this.commonService.breadcrumbEmitter.subscribe(e => {
      console.log("bread")
      this.breadcrumb = e;
    });

    this.commonService.pageHeadingEmitter.subscribe(e => {
      this.pageHeading = e;
    });

    const storedImage = localStorage.getItem('profileImage');
  if (storedImage) {
    this.profileImageSrc = storedImage;
  }

  }


  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageSrc = e.target.result;
        localStorage.setItem('profileImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  openDialog() {
    this.dialog.open(ChangePassDialogueComponent, {
      width: '600px',
      height: '400px ',
    });
  }

  onLogout() {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['login']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the cancellation action if needed
      }
    });
  }
  isToggle(){
    this.isExpanded=true
  }
}




