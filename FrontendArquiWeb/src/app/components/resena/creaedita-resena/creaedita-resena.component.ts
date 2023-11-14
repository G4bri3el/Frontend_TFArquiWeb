import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Resena } from 'src/app/model/resena';
import { Reserva } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { ResenaService } from '../../../service/resena/resena.service';

@Component({
  selector: 'app-creaedita-resena',
  templateUrl: './creaedita-resena.component.html',
  styleUrls: ['./creaedita-resena.component.css']
})
export class CreaeditaResenaComponent implements OnInit{ 

  form: FormGroup = new FormGroup({});
  resenita: Resena = new Resena();
  mensaje: string = '';

  cantidadestrellas: { value: number; viewValue: string }[] = [
    { value: 1, viewValue:  '★' },
    { value: 2, viewValue: '★★'},
    {value:3, viewValue: '★★★'},
    {value:4, viewValue: '★★★★'},
    {value:5, viewValue: '★★★★★'},
  ];

  listaReservas: Reserva[] = [];

  constructor(
    private rS: ReservaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private reS: ResenaService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      resenaestrellas: ['', Validators.required], 
      resenacomentario: ['', Validators.required],
      reserva: ['', Validators.required],
    });

    //Reserva
    this.rS.list().subscribe((data) => {
      this.listaReservas = data;
    });
      
  }

  aceptar(): void {
    if (this.form.valid) {
      this.resenita.resenaestrellas = this.form.value.resenaestrellas;
      this.resenita.resenacomentario = this.form.value.resenacomentario;
      this.resenita.reserva.reservaid = this.form.value.reserva;

      this.reS.insert(this.resenita).subscribe(data => {
        this.reS.list().subscribe(lista => {
          this.reS.setList(lista);
        });
      });

      this.router.navigate(['resenas']);
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
