import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { BicicletaComponent } from './components/bicicleta/bicicleta.component';
import { CreaeditaBicicletaComponent } from './components/bicicleta/creaedita-bicicleta/creaedita-bicicleta.component';

const routes: Routes = [
  {
    path: 'usuario', component: UsuarioComponent, children:[
      {path:'nuevo',component:CreaeditaUsuarioComponent},
      {path:'empresaio', component:CreaeditaUsuarioComponent},
    ]
  },
  {
    path: 'bicicleta', component:BicicletaComponent, children: [
      {path: 'nuevo', component: CreaeditaBicicletaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
