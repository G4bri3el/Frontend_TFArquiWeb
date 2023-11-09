import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bicicleta } from 'src/app/model/bicicleta';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class BicicletaService {
  private url = `${base_url}/TP1`;
  private listaCambio = new Subject<Bicicleta[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Bicicleta[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
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

  listId(id: number) {
    return this.http.get<Bicicleta>(`${this.url}/${id}`);
  }
  update(b: Bicicleta) {
    return this.http.put(this.url, b);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
