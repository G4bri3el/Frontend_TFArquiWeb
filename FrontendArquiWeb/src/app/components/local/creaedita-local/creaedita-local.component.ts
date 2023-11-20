import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Local } from 'src/app/model/local';
import { LocalService } from 'src/app/service/local/local.service';
import { ImageService } from 'src/app/service/image.service';
import { UserDataService } from 'src/app/service/user-data/user-data.service';

@Component({
  selector: 'app-creaedita-local',
  templateUrl: './creaedita-local.component.html',
  styleUrls: ['./creaedita-local.component.css'],
})
export class CreaeditaLocalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  local: Local = new Local();
  mensaje: string = '';
  localid: number=0;
  edicion: boolean = false;
  file: File;
  url: any = '';
  idUser: number = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private lS: LocalService,
    private imageService: ImageService,
    private uDS: UserDataService,

  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.route.params.subscribe((data: Params) => {
      this.localid = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      localnombre: ['', Validators.required],
      localdireccion: ['', Validators.required],
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
        this.mensaje = 'Imagen no encontrada';
      }
    } else {
      this.mensaje = 'Ingrese todos los campos!!';
    }
  }

  continuarConRegistro(): void {
    this.local.localdireccion = this.form.value.localdireccion;
    this.local.localnombre = this.form.value.localnombre;
    this.local.usuario.usuarioId = this.idUser;
    this.local.localfoto = this.url;
    if (this.edicion) {
      this.lS.update(this.local).subscribe(() => {
        this.lS.list().subscribe((data) => {
          this.lS.setList(data);
        });
      });
    } else {
      this.lS.insert(this.local).subscribe((data) => {
        this.lS.list().subscribe((lista) => {
          this.lS.setList(lista);
        });
      });
    }
    this.router.navigate(['local/mi']);
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
  init() {
    if (this.edicion) {
      this.lS.listId(this.localid).subscribe((data) => {
        this.local = data; // Asignar los datos al objeto bicicleta
        this.form.patchValue({
          localnombre: data.localnombre,
          localdireccion: data.localdireccion,
          usuario: data.usuario.usuarioId,
          localfoto: data.localfoto,
          
        });
      });
    }
  }

  loadUserData(): void {
    this.uDS.getUserData().subscribe((data) => {
      this.idUser = data.usuarioId;
      console.log("Id usuari:"+this.idUser);
    });
  }
}
