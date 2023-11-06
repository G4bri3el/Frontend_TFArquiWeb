import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LocalComponent } from './components/local/local.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { MaterialModule } from './material/material.module';
import { CreaeditaLocalComponent } from './components/local/creaedita-local/creaedita-local.component';
import { ListarLocalComponent } from './components/local/listar-local/listar-local.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import  {HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LocalComponent,
    CreaeditaUsuarioComponent,
    CreaeditaLocalComponent,
    ListarLocalComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
