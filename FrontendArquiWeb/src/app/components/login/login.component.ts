import { LoginService } from './../../service/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from './../../model/jwtRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string= '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
  }
  
  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe((data: any) => {
      sessionStorage.setItem("token",data.jwttoken);
      this.router.navigate(['/bicicleta']);
    }, error => {
      this.mensaje= "Credenciales incorrectas"
      this.snackBar.open(this.mensaje, '', {duration: 2000});
    });
  }
}
