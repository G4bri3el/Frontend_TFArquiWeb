import { MatSidenav } from '@angular/material/sidenav';
import { LoginService } from './../../service/login/login.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  role: string = '';
  sidenavOpened = true;


  @ViewChild('sidenav') sidenav: MatSidenav;

  
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

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  
}
