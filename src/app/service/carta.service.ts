import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ganador } from '../models/ganador';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  apiUrl:string = 'http://localhost:8080/memo-test/v1/cartas';
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
    localStorage.setItem('ganadores', JSON.stringify(this.listadoGanadores));
  }
}
