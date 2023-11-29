import { EventEmitter, Injectable, Output } from '@angular/core';
import { Breadcrumb } from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }

  @Output() breadcrumbEmitter = new EventEmitter<Breadcrumb>();

  @Output() pageHeadingEmitter = new EventEmitter<string>();


}
