import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { BicicletaComponent } from './components/bicicleta/bicicleta.component';
import { CreaeditaBicicletaComponent } from './components/bicicleta/creaedita-bicicleta/creaedita-bicicleta.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  {
    path: 'usuario', component: UsuarioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaUsuarioComponent },
      { path: 'empresaio', component: CreaeditaUsuarioComponent },
    ],
  },
  {
    path: 'bicicleta', component: BicicletaComponent,
    children: [{ 
      path: 'nuevo', component: CreaeditaBicicletaComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
