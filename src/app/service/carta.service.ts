import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ganador } from '../models/ganador';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  apiUrl:string = '../../assets/cartas.json';
  listadoGanadores:Ganador[] = [];

  constructor(private http:HttpClient) { }

  obtenerCartas(){
    return this.http.get(this.apiUrl);
  }

  obtenerGanadores(){
    var ganadoresString = localStorage.getItem('ganadores');
    if (ganadoresString !== null) {
      this.listadoGanadores = JSON.parse(ganadoresString);
    }
    return this.listadoGanadores;
  }

  agregarGanador(nombre:string, movimientos:number, tiempo:string){
    this.obtenerGanadores();

    var ganador:Ganador = {
      nombre : nombre,
      tiempo : tiempo,
      movimientos : movimientos
    }
    this.listadoGanadores.push(ganador);
    localStorage.setItem('ganadores', JSON.stringify(this.ganadoresOrdenados()));
  }

  ganadoresOrdenados(){
    return this.listadoGanadores.sort(this.compararPorMovimientos);
  }

  compararPorMovimientos(ganador1:Ganador, ganador2:Ganador){
    return ganador1.movimientos - ganador2.movimientos;
  }
}
