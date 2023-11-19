import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Local } from 'src/app/model/local';
import { GananciaLocalDTO } from 'src/app/model/GananciaLocalDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private url = `${base_url}/locales`;
  private listaCambio = new Subject<Local[]>();
  constructor(private http: HttpClient) { }
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Local[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(i: Local) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, i, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Local[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Local>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(l: Local) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, l, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getGanancias(): Observable<GananciaLocalDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<GananciaLocalDTO[]>(`${this.url}/ganancia`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


}
