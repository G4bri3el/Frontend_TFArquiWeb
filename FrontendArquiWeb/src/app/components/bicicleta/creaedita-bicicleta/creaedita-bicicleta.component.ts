import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bicicleta } from 'src/app/model/bicicleta';
import { Local } from 'src/app/model/local';
import { BicicletaService } from 'src/app/service/bicicleta/bicicleta.service';
import { LocalService } from 'src/app/service/local/local.service';

@Component({
  selector: 'app-creaedita-bicicleta',
  templateUrl: './creaedita-bicicleta.component.html',
  styleUrls: ['./creaedita-bicicleta.component.css']
})
export class CreaeditaBicicletaComponent {
  form: FormGroup = new FormGroup({});
  bici: Bicicleta = new Bicicleta();
  mensaje: string = '';
 
  tiposestado: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Disponible' },
    { value: false, viewValue: 'No disponible' },
  ];

  listaLocales: Local[] = [];

  constructor(
    private lS: LocalService,
    private router: Router,
    private formBuilder: FormBuilder,
    private bS: BicicletaService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      bicicletamodelo: ['', Validators.required], 
      bicicletaestado: ['', Validators.required],
      bicicletaprecio: ['', Validators.required],
      bicicletanumaro: ['', Validators.required],
      bicicletadetalles: ['', Validators.required],
      bicicletafoto: ['', Validators.required],
      local: ['', Validators.required],
    });

    //Local
    this.lS.list().subscribe((data) => {
      this.listaLocales = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.bici.bicicletamodelo = this.form.value.bicicletamodelo;
      this.bici.bicicletaestado = this.form.value.bicicletaestado;
      this.bici.bicicletaprecio = this.form.value.bicicletaprecio;
      this.bici.bicicletanumaro = this.form.value.bicicletanumaro;
      this.bici.bicicletadetalles = this.form.value.bicicletadetalles;
      this.bici.bicicletafoto = this.form.value.bicicletafoto;
      this.bici.local.localid = this.form.value.local;

      this.bS.insert(this.bici).subscribe(data => {
        this.bS.list().subscribe(lista => {
          this.bS.setList(lista);
        });
      });

      this.router.navigate(['bicicleta']);
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
