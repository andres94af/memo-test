import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { JuegoComponent } from './app/component/juego/juego.component';
import { InicioComponent } from './app/component/inicio/inicio.component';

import { HttpClientModule } from '@angular/common/http';
import { ResultadosComponent } from './app/component/resultados/resultados.component';

@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    InicioComponent,
    ResultadosComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
