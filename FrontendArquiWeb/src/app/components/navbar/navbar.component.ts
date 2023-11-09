import { LoginService } from './../../service/login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  role: string = '';

  constructor(private loginService: LoginService) { }

  cerrar(){
    sessionStorage.clear();
  }

  verificar(){
    this.role = this.loginService.showRole();
    return this.loginService.verificarSesion();
  }

  validarRol(rol: String){
    if(this.role == rol){
      return true;
    }else{
      return false;
    }
  }
}
