import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  apiUrl:string = 'http://localhost:8080/memo-test/v1/cartas';

  constructor(private http:HttpClient) { }

  obtenerCartas(){
    return this.http.get(this.apiUrl);
  }
}
