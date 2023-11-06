import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { LocalComponent } from './components/local/local.component';
import { CreaeditaLocalComponent } from './components/local/creaedita-local/creaedita-local.component';

const routes: Routes = [
  {
    path: 'usuario', component: UsuarioComponent, children:[
      {path:'nuevo',component:CreaeditaUsuarioComponent},
    ]
  },
  {
    path: 'local', component: LocalComponent, children:[
      {path:'nuevo', component:CreaeditaLocalComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
