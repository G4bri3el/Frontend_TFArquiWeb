import { Injectable } from '@angular/core';
import { Resena } from 'src/app/model/resena';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private url = `${base_url}/resenas`;

  private listaCambio = new Subject<Resena[]>();
  constructor(private http:HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Resena[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  
  insert(re: Resena) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, re, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Resena[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

}
