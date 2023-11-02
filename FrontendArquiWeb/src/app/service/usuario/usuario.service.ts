import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url =  `${base_url}/dulces`;
  constructor(private http: HttpClient) { }

  insert(u: Usuario){

  }
}
