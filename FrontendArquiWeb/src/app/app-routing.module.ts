import { ListarBicicletaClienteComponent } from './components/bicicleta/listar-bicicleta-cliente/listar-bicicleta-cliente.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { BicicletaComponent } from './components/bicicleta/bicicleta.component';
import { CreaeditaBicicletaComponent } from './components/bicicleta/creaedita-bicicleta/creaedita-bicicleta.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LocalComponent } from './components/local/local.component';
import { CreaeditaLocalComponent } from './components/local/creaedita-local/creaedita-local.component';
import { CreaeditaEmpresarioComponent } from './components/usuario/creaedita-empresario/creaedita-empresario.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CreaeditaReservaComponent } from './components/reserva/creaedita-reserva/creaedita-reserva.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ResenaComponent } from './components/resena/resena.component';
import { CreaeditaResenaComponent } from './components/resena/creaedita-resena/creaedita-resena.component';
import { ListarLocalComponent } from './components/local/listar-local/listar-local.component';
import { ListarResenaComponent } from './components/resena/listar-resena/listar-resena.component';
import { ListarReservaComponent } from './components/reserva/listar-reserva/listar-reserva.component';
import { ListarBicicletaComponent } from './components/bicicleta/listar-bicicleta/listar-bicicleta.component';
import { vigilanteGuard } from './vigilante.guard';
import { ReportesComponent } from './components/reportes/reportes/reportes.component';
import { ReporteReservaxempresarioComponent } from './components/reportes/reporte-reservaxempresario/reporte-reservaxempresario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'usuario', component: UsuarioComponent, canActivate:[vigilanteGuard],
    children: [
      { path: 'nuevo', component: CreaeditaUsuarioComponent },
      { path: 'empresario', component: CreaeditaEmpresarioComponent },
    ],
  },
  {
    path: 'bicicleta', component: BicicletaComponent,canActivate:[vigilanteGuard],
    children: [
      { path: 'nuevo', component: CreaeditaBicicletaComponent },
      { path: 'listar', component: ListarBicicletaComponent},
      { path: 'edicion/:id', component: CreaeditaBicicletaComponent },
      { path: 'listaCliente', component: ListarBicicletaClienteComponent }],
  },
  {
    path: 'local', component: LocalComponent,canActivate:[vigilanteGuard],
    children: [{

      path: 'nuevo', component: CreaeditaLocalComponent
    },
    { path: 'listar', component: ListarLocalComponent }],
  },
  {
    path: 'reserva', component: ReservaComponent,canActivate:[vigilanteGuard],
    children: [
      { path: 'nuevo', component: CreaeditaReservaComponent }
      ,
    { path: 'listar', component: ListarReservaComponent }
    ]
  },
  {
    path: 'reportes', component: ReportesComponent,canActivate:[vigilanteGuard],
    children: [
      { path: 'reservaxem', component: ReporteReservaxempresarioComponent }
    ]
  },
  {
    path: 'resena', component: ResenaComponent,canActivate:[vigilanteGuard],
    children: [
      { path: 'nuevo', component: CreaeditaResenaComponent }
      ,
    { path: 'listar', component: ListarResenaComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
