import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Local } from 'src/app/model/local';
import { LocalService } from 'src/app/service/local/local.service';
import { Usuario } from 'src/app/model/usuario';
import { ImageUploadComponent } from '../../image-upload/image-upload.component';

@Component({
  selector: 'app-creaedita-local',
  templateUrl: './creaedita-local.component.html',
  styleUrls: ['./creaedita-local.component.css']
})
export class CreaeditaLocalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  local: Local = new Local()
  mensaje: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private lS: LocalService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      localdireccion: ['', Validators.required],
      localnombre: ['', Validators.required],
      localfoto: ['',Validators.required],
      usuario: ['', Validators.required]
    });

  }

  aceptar(): void {
    if (this.form.valid) {
      this.local.localdireccion = this.form.value.localdireccion;
      this.local.localnombre = this.form.value.localnombre;
      this.local.localfoto=this.form.value.localfoto;
      this.local.usuario.usuarioId = this.form.value.usuario;

      this.lS.insert(this.local).subscribe(data => {
        this.lS.list().subscribe(data => {
          this.lS.setList(data)
        })
      })
      this.router.navigate(['local'])
    } else {
      this.mensaje = 'Ingrese todos los campos!!'
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
