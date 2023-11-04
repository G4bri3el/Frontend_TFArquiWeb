import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Roles } from 'src/app/model/roles';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = `${base_url}/roles`
  constructor(private http: HttpClient) { }

  listarRoles() {
    return this.http.get<Roles[]>(this.url);
  }
}
