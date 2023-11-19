import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { updateLocale } from 'moment';
import { Bicicleta } from 'src/app/model/bicicleta';
import { Local } from 'src/app/model/local';
import { BicicletaService } from 'src/app/service/bicicleta/bicicleta.service';
import { ImageService } from 'src/app/service/image.service';
import { LocalService } from 'src/app/service/local/local.service';

@Component({
  selector: 'app-creaedita-bicicleta',
  templateUrl: './creaedita-bicicleta.component.html',
  styleUrls: ['./creaedita-bicicleta.component.css'],
})
export class CreaeditaBicicletaComponent {
  form: FormGroup = new FormGroup({});
  bici: Bicicleta = new Bicicleta();
  mensaje: string = '';
  idbicicleta: number = 0;
  edicion: boolean = false;
  file: File;
  url: string = '';
  tiposestado: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Disponible' },
    { value: false, viewValue: 'No disponible' },
  ];

  numerodearos: { value: number; viewValue: number }[] = [
    { value: 12, viewValue: 12 },
    { value: 16, viewValue: 16 },
    { value: 20, viewValue: 20 },
    { value: 24, viewValue: 24 },
    { value: 26, viewValue: 26 },
    { value: 29, viewValue: 29 },
  ];

  listaLocales: Local[] = [];

  constructor(
    private lS: LocalService,
    private router: Router,
    private formBuilder: FormBuilder,
    private bS: BicicletaService,
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idbicicleta = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      bicicletamodelo: ['', Validators.required],
      bicicletaprecio: [
        '',
        [Validators.required, Validators.pattern(/^(?!0\d)\d+(\.\d+)?$/)],
      ], // Acepta números enteros o decimales que no comiencen con cero
      bicicletanumaro: ['', Validators.required],
      bicicletadetalles: ['', Validators.required],
      local: ['', Validators.required],
    });

    //Local
    this.lS.list().subscribe((data) => {
      this.listaLocales = data;
    });
  }
  addNewFileBici(value: File) {
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

            this.router.navigate(['/bicicleta/listar']);
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
            this.mensaje = 'Error al subir la imagen';
          }
        ); 
      } else {
        this.mensaje = 'Imagen no encontrada';
      }
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  continuarConRegistro(): void {
    this.bici.bicicletamodelo = this.form.value.bicicletamodelo;
    this.bici.bicicletaprecio = this.form.value.bicicletaprecio;
    this.bici.bicicletanumaro = this.form.value.bicicletanumaro;
    this.bici.bicicletadetalles = this.form.value.bicicletadetalles;
    this.bici.bicicletafoto = this.url;
    this.bici.local.localid = this.form.value.local;

    if (this.edicion) {
      this.bS.update(this.bici).subscribe(() => {
        this.bS.list().subscribe((data) => {
          this.bS.setList(data);
        });
      });
    } else {
      this.bS.insert(this.bici).subscribe((data) => {
        this.bS.list().subscribe((lista) => {
          this.bS.setList(lista);
        });
      });
    }
    this.router.navigate(['bicicleta']);
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  onInputChange(event: any) {
    //evento que no permite escribir letras en campos numericos
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9.]/g, ''); // permite escribir números y el punto decimal
  }

  init() {
    if (this.edicion) {
      this.bS.listId(this.idbicicleta).subscribe((data) => {
        this.bici = data; // Asignar los datos al objeto bicicleta
        this.form.patchValue({
          bicicletamodelo: data.bicicletamodelo,
          bicicletaprecio: data.bicicletaprecio,
          bicicletanumaro: data.bicicletanumaro,
          bicicletadetalles: data.bicicletadetalles,
          bicicletaestado: data.bicicletaestado,
          bicicletafoto: data.bicicletafoto,
          local: data.local.localid,
        });
      });
    }
  }


  onAceptarClick(event: Event) {
    event.preventDefault();
    this.aceptar(); // Llama al método onFormSubmit() u otra lógica según sea necesario
  }
  

}
