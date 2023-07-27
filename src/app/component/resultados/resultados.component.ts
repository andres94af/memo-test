import { Component } from '@angular/core';
import { Ganador } from 'src/app/models/ganador';
import { CartaService } from 'src/app/service/carta.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  ganadores:Ganador[] = [];

  constructor(private cartaService:CartaService){
    this.ganadores = this.cartaService.obtenerGanadores();
  }

}
