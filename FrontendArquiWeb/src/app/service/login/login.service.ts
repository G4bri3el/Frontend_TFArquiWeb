import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from 'src/app/model/jwtRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(request: JwtRequest){
    return this.http.post("http://localhost:8080/login/authenticate",request);
  }

  verificarSesion(){
    let token = sessionStorage.getItem("token");
    if(token != null){
      return true;
    }else{
      return false;
    }
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
