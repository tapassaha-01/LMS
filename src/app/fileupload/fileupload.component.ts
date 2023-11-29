import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent {

  // @Input() valueFromParent: string | undefined;
  @Output() valueChanged = new EventEmitter<any>();
 files: any[] = [];
 value:string=''
  fileTransferForm: FormGroup;
 constructor(private fb: FormBuilder,private sharedservice:SharedService) {
 
  this.fileTransferForm = this.fb.group({
    fileControl: [''] // Initialize with default value or an empty array for multiple files
  });
}

 ngOnInit() {
  // this.fileTransferForm.get('fileControl')?.valueChanges.subscribe(value => {
  //   const files: any[] = Array.from(value);
  //   this.prepareFilesList(files);
  // });
  // console.log(this.files)
}

  /**
   * on file drop handler
   */
  onFileDropped($event: any[]) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */

  
  fileBrowseHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const fileList: FileList = inputElement.files;
      const files: any[] = Array.from(fileList);
      this.prepareFilesList(files);
    }
    this.sharedservice.setFiles(this.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number) {
    if (bytes === 0) {
      return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizeInBytes = parseFloat((bytes / Math.pow(k, i)).toFixed(2)); // Adjust the number of decimal places as needed

  return sizeInBytes + ' ' + sizes[i];
  }
  
}
