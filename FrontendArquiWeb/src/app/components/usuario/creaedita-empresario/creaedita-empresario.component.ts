import { Roles } from './../../../model/roles';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/service/roles/roles.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import * as bcryptjs from 'bcryptjs';

@Component({
  selector: 'app-creaedita-empresario',
  templateUrl: './creaedita-empresario.component.html',
  styleUrls: ['./creaedita-empresario.component.css']
})
export class CreaeditaEmpresarioComponent  implements OnInit{
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  mensaje: string = '';

  constructor(
    private rS: RolesService,
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
      //-----
      usuarioFoto: ['',Validators.required],
      usuarioRazonsocial: ['',Validators.required],
      usuarioDireccion: ['',Validators.required],
      usuarioRuc: ['',Validators.required],
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
      //---------------
      this.usuario.usuarioFoto = this.form.value.usuarioFoto;
      this.usuario.usuarioRazonsocial = this.form.value.usuarioRazonsocial;
      this.usuario.usuarioDireccion = this.form.value.usuarioDireccion;
      this.usuario.usuarioRuc = this.form.value.usuarioRuc;
      //----------------
      this.usuario.roles.rolesId = 3;
      
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
}
