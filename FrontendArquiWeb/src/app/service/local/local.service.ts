import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Local } from 'src/app/model/local';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private url = `${base_url}/locales`

  constructor(private http: HttpClient) { }

  listarLocales() {
    return this.http.get<Local[]>(this.url);
  }
}
