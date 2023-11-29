import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private files: File[] = [];

  getFiles(): File[] {
    return this.files;
  }

  setFiles(value: File[]) {
    this.files = value;
  }

  constructor() { }

}
