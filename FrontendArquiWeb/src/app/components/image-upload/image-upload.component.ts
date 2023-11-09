import { Component } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';

class ImageSnippet{
  constructor(public src:string, public file:File){}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  
  selectedFile:ImageSnippet;

  constructor(private imageService:ImageService){}

  processFile(imageInput:any){
    const file:File=imageInput.files[0];
    const reader= new FileReader();

    reader.addEventListener('load',(event:any)=>{
      this.selectedFile=new ImageSnippet(event.target.result,file);

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res)=>{

        },
        (err)=>{

        }
      )
    });

    reader.readAsDataURL(file);
  }
}
