import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Reserva } from 'src/app/model/reserva';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private url = `${base_url}/reservas`;
  private listaCambio = new Subject<Reserva[]>();
  constructor(private http:HttpClient) {}

  list(): Observable<Reserva[]>  {
    let token = sessionStorage.getItem('token');

    return this.http.get<Reserva[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(r: Reserva): Observable<any> {
    let token = sessionStorage.getItem('token');

    return this.http.post<any>(this.url, r, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Reserva[]) {
    this.listaCambio.next(listaNueva);
  }
  getList():Observable<Reserva[]> {
    return this.listaCambio.asObservable();
  }
}
