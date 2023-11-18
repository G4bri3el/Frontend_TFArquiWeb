import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Detalledereserva } from 'src/app/model/detalledereserva';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DetalledereservaService {
  private url = `${base_url}/detallesdereservas`;
  private listaCambio = new Subject<Detalledereserva[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Detalledereserva[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(dr: Detalledereserva) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, dr, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Detalledereserva[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
