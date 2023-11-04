import { Roles } from './../../../model/roles';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/service/roles/roles.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-creaedita-usuario',
  templateUrl: './creaedita-usuario.component.html',
  styleUrls: ['./creaedita-usuario.component.css'],
})
export class CreaeditaUsuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  mensaje: string = '';

  listaRoles: Roles[] = [];

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
      roles: ['',Validators.required],
    });

    this.rS.listarRoles().subscribe((data) => {
      this.listaRoles = data;
    });
  }

  aceptar(): void{
    if(this.form.valid){
      this.usuario.usuarioCorreo = this.form.value.usuarioCorreo;
      this.usuario.usuarioContrasena = this.form.value.usuarioContrasena;
      this.usuario.usuarioTelefono = this.form.value.usuarioTelefono;
      this.usuario.usuarioNombre = this.form.value.usuarioNombre;
      this.usuario.usuarioApellido = this.form.value.usuarioApellido;
      this.usuario.usuarioDni = this.form.value.usuarioDni;
      this.usuario.usuarioEdad = this.form.value.usuarioEdad;
      this.usuario.usuarioCiudad = this.form.value.usuarioCiudad;
      this.usuario.roles.rolesId = this.form.value.roles;
      
      this.uS.insert(this.usuario).subscribe(data => {
        this.uS.list().subscribe(lista => {
          this.uS.setlist(lista);
        });
      });

      this.router.navigate(['usuario']);
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
