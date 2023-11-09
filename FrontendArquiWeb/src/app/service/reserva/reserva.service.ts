import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
    return this.http.get<Reserva[]>(this.url);
  }
  insert(r: Reserva) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: Reserva[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}
