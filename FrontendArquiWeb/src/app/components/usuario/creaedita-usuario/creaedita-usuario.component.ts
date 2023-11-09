import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import * as bcryptjs from 'bcryptjs';

@Component({
  selector: 'app-creaedita-usuario',
  templateUrl: './creaedita-usuario.component.html',
  styleUrls: ['./creaedita-usuario.component.css'],
})
export class CreaeditaUsuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  mensaje: string = '';

  visible: boolean = true;
  changetype: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuarioCorreo: ['', Validators.required],
      usuarioContrasena: ['', Validators.required],
      usuarioTelefono: ['', Validators.required],
      usuarioNombre: ['', Validators.required],
      usuarioApellido: ['', Validators.required],
      usuarioDni: ['',Validators.required],
      usuarioEdad: ['',Validators.required],
      usuarioCiudad: ['',Validators.required],
    });
  }

  aceptar(): void{
    let contraEncrypt: string = bcryptjs.hashSync(this.form.value.usuarioContrasena, 12);

    if(this.form.valid){
      this.usuario.usuarioCorreo = this.form.value.usuarioCorreo;
      this.usuario.usuarioContrasena = contraEncrypt;
      this.usuario.usuarioTelefono = this.form.value.usuarioTelefono;
      this.usuario.usuarioNombre = this.form.value.usuarioNombre;
      this.usuario.usuarioApellido = this.form.value.usuarioApellido;
      this.usuario.usuarioDni = this.form.value.usuarioDni;
      this.usuario.usuarioEdad = this.form.value.usuarioEdad;
      this.usuario.usuarioCiudad = this.form.value.usuarioCiudad;
      this.usuario.roles.rolesId = 2;
      
      this.uS.insert(this.usuario).subscribe(data => {
        this.uS.list().subscribe(lista => {
          this.uS.setlist(lista);
        });
      });

      this.router.navigate(['login']);
    }else{
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  viewpassword(){
    this.visible = !this.visible;
    this.changetype = !this.changetype; 
  }
}
