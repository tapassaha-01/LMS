import { Component, Input } from '@angular/core';

@Component({
  
  selector: 'app-page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.css']
})
export class PageHeadingComponent {

  @Input() pageHeading?: string | null = null;

}
