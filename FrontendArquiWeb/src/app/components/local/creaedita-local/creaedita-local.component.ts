import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Local } from 'src/app/model/local';
import { LocalService } from 'src/app/service/local/local.service';
import { Usuario } from 'src/app/model/usuario';
import { ImageUploadComponent } from '../../image-upload/image-upload.component';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-creaedita-local',
  templateUrl: './creaedita-local.component.html',
  styleUrls: ['./creaedita-local.component.css'],
})
export class CreaeditaLocalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  local: Local = new Local();
  mensaje: string = '';
  file: File;
  url: any = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private lS: LocalService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      localdireccion: ['', Validators.required],
      localnombre: ['', Validators.required],
      usuario: ['', Validators.required],
    });
  }
  addNewFileLocal(value: File) {
    this.file = value;
  }

  aceptar(): void {
    if (this.form.valid) {
      if (this.file) {
        this.imageService.uploadImage(this.file).subscribe(
          (response) => {
            this.url = response.url;
            console.log(this.url);
            this.continuarConRegistro();
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
            this.mensaje = 'Error al subir la imagen';
          }
        );
      } else {
        //--------si no hay imagen
      }
    } else {
      this.mensaje = 'Ingrese todos los campos!!';
    }
  }

  continuarConRegistro(): void {
    this.local.localdireccion = this.form.value.localdireccion;
    this.local.localnombre = this.form.value.localnombre;
    this.local.usuario.usuarioId = this.form.value.usuario;
    this.local.localfoto = this.url;
    this.lS.insert(this.local).subscribe((data) => {
      this.lS.list().subscribe((data) => {
        this.lS.setList(data);
      });
    });
    this.router.navigate(['/local/listar']);
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  onAceptarClick(event: Event) {
    event.preventDefault();
    this.aceptar(); // Llama al método onFormSubmit() u otra lógica según sea necesario
  }
}
