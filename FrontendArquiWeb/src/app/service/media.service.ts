import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private url = `${base_url}/media/upload`;
  constructor(
    private http:HttpClient
  ) { }

  uploadFile(formData:FormData): Observable<any>{
    let token = sessionStorage.getItem('token');

    return this.http.post('http://localhost:8080/media/upload', formData, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });
    //return this.http.post('http://localhost:8080/media/upload',formData);
  }
}
