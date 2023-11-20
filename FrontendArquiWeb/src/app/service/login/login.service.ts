import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from 'src/app/model/jwtRequest';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(request: JwtRequest){
    return this.http.post(`${base_url}/login/authenticate`,request);
  }

  verificarSesion(){
    let token = sessionStorage.getItem("token");
    return token != null
  }

  showRole(){
    let token = sessionStorage.getItem("token");
    if(!token){
      return null;
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken.role;
  }
}
