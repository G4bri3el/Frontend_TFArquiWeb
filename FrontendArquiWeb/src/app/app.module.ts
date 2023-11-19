import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LocalComponent } from './components/local/local.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { MaterialModule } from './material/material.module';
import { BicicletaComponent } from './components/bicicleta/bicicleta.component';
import { CreaeditaBicicletaComponent } from './components/bicicleta/creaedita-bicicleta/creaedita-bicicleta.component';
import { ListarBicicletaComponent } from './components/bicicleta/listar-bicicleta/listar-bicicleta.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { CreaeditaLocalComponent } from './components/local/creaedita-local/creaedita-local.component';
import { ListarLocalComponent } from './components/local/listar-local/listar-local.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { CreaeditaEmpresarioComponent } from './components/usuario/creaedita-empresario/creaedita-empresario.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CreaeditaReservaComponent } from './components/reserva/creaedita-reserva/creaedita-reserva.component';
import { ListarReservaComponent } from './components/reserva/listar-reserva/listar-reserva.component';
import { ListarBicicletaClienteComponent } from './components/bicicleta/listar-bicicleta-cliente/listar-bicicleta-cliente.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistroComponent } from './components/registro/registro.component';
import { CartComponent } from './components/cart/cart.component';
import { ResenaComponent } from './components/resena/resena.component';
import { ListarResenaComponent } from './components/resena/listar-resena/listar-resena.component';
import { CreaeditaResenaComponent } from './components/resena/creaedita-resena/creaedita-resena.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ReporteMedinaComponent } from './components/reporte/reporte-medina/reporte-medina.component';
@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LocalComponent,
    CreaeditaUsuarioComponent,
    BicicletaComponent,
    CreaeditaBicicletaComponent,
    ListarBicicletaComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    CreaeditaLocalComponent,
    ListarLocalComponent,
    ImageUploadComponent,
    CreaeditaEmpresarioComponent,
    ReservaComponent,
    CreaeditaReservaComponent,
    ListarReservaComponent,
    RegistroComponent,
    CartComponent,
    ListarBicicletaClienteComponent,
    ResenaComponent,
    ListarResenaComponent,
    CreaeditaResenaComponent,
    ReporteComponent,
    ReporteMedinaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
