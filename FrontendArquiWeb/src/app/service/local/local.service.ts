import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Local } from 'src/app/model/local';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private url = `${base_url}/locales`;
  private listaCambio = new Subject<Local[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Local[]>(this.url);
  }
  insert(i: Local) {
    return this.http.post(this.url, i);
  }
  setList(listaNueva: Local[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
