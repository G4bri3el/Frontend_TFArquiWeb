import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import {Subject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  public uploadImage(image:File):Observable<Response>{
    const formData=new FormData();

    formData.append('image',image);

    return this.http.post<Response>('/',formData);
  }
}
