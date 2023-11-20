import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { Reserva } from 'src/app/model/reserva';
import { Usuario } from 'src/app/model/usuario';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-creaedita-reserva',
  templateUrl: './creaedita-reserva.component.html',
  styleUrls: ['./creaedita-reserva.component.css']
})
export class CreaeditaReservaComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  reserva: Reserva = new Reserva();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  maxFechaFin: Date = moment().add(-1, 'days').toDate();


  reservafechainicio = new FormControl(new Date());
  reservafechafin = new FormControl(new Date());


  ListaUsuarios: Usuario[] = [];

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private rS: ReservaService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      reservafechainicio: ['', Validators.required],
      reservafechafin: ['', Validators.required],
      reservamontototal: ['', Validators.required],
      usuario: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.ListaUsuarios = data;
    });  
  }

  aceptar(): void {
    if (this.form.valid) {
      this.reserva.reservafechainicio = this.form.value.reservafechainicio;
      this.reserva.reservafechafin = this.form.value.reservafechafin;
      this.reserva.reservamontototal = this.form.value.reservamontototal;
      this.reserva.usuario.usuarioId = this.form.value.usuario;

      this.rS.insert(this.reserva).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['reserva/listar']);
    } else {
      this.mensaje = 'Ingrese todos los campos!!!!';
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
