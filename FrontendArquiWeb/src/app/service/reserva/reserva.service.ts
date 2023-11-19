import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ReservasxEmpresarioDto } from 'src/app/model/ReservasxEmpresarioDto';
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

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Reserva[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(r: Reserva) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, r, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Reserva[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  getCount(): Observable<ReservasxEmpresarioDto[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<ReservasxEmpresarioDto[]>(`${this.url}/reservaxem`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
