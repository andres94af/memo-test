import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { JuegoComponent } from './component/juego/juego.component';
import { ResultadosComponent } from './component/resultados/resultados.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'comienzo', component: JuegoComponent },
  { path: 'resultados', component: ResultadosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
