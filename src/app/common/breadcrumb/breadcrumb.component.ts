import { Component, Input } from '@angular/core';
import { Breadcrumb } from 'src/app/models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

  @Input() breadcrumb?: Breadcrumb | null;

}
