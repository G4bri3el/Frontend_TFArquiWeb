import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  uploadImage(imagen:File):Observable<any>{
    let token = sessionStorage.getItem('token');
    const formData = new FormData();
    formData.append('file',imagen);

    return this.http.post<any>('http://localhost:8080/media/upload',formData)
  }
}
