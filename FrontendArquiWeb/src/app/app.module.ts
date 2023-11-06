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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
