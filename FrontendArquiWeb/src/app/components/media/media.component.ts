import { Component } from '@angular/core';
import { MediaService } from 'src/app/service/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  url?:string;

  constructor(
    private mediaService:MediaService
  ){}

  upload(event:any){
    const file=event.target.files[0];
    if (file){
      const formData=new FormData();
      formData.append('file',file);

      this.mediaService.uploadFile(formData).subscribe(response=>{
        console.log('response',response);
        this.url=response.url;
     })
    }
  }
}
