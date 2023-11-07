import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CreaeditaReservaComponent } from './components/reserva/creaedita-reserva/creaedita-reserva.component';

const routes: Routes = [
  {
    path: 'usuario', component: UsuarioComponent, children:[
      {path:'nuevo',component:CreaeditaUsuarioComponent},
      {path:'empresaio', component:CreaeditaUsuarioComponent},
    ]
  },
  {
    path:'reserva', component:ReservaComponent, children: [
      {path:'nuevo', component:CreaeditaReservaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
