import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bicicleta } from 'src/app/model/bicicleta';
import { environment } from 'src/environments/environment.development';


const base_url = environment.base;


@Injectable({
  providedIn: 'root'
})
export class BicicletaService {

  private url = `${base_url}/TP1`;
  private listaCambio = new Subject<Bicicleta[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Bicicleta[]>(this.url);
  }
  insert(bi: Bicicleta) {
    return this.http.post(this.url, bi);
  }
  setList(listaNueva: Bicicleta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  

}
