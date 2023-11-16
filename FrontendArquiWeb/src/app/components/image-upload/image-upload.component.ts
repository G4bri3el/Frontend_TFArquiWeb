import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  
  @Output() newFileEvent = new EventEmitter<File>();
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private imageService:ImageService){}
  
  upload(event: any){
    const file = event.target.files[0];
    if(file){
      this.selectedFile = file;
      this.previewImage(file);
      this.newFileEvent.emit(file);
      
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  openFileInput() {
    if(this.fileInput){
      
      this.fileInput.nativeElement.click();
      this.fileInput.nativeElement.preventDefault();
    }
  }
}
