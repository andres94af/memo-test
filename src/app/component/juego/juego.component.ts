import { Component } from '@angular/core';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/service/carta.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent {
  cartas: Carta[] = [];

  tiempo: number = 0;

  contadorMovimientos: number = 0;

  valorCarta1: string = '';
  idCarta1: number = 0;

  valorCarta2: string = '';
  idCarta2: number = 0;

  resultadoComparacion: boolean = false;

  constructor(private cartaService: CartaService) {
    this.obtenerCartas();
  }

  obtenerCartas() {
    this.cartaService.obtenerCartas().subscribe({
      next: (cartas) => {
        this.cartas = Object.values(cartas);
        this.cartas = this.duplicarYDesordenarArray(this.cartas);
      },
      error: (err) => console.log(err),
    });
  }

  duplicarYDesordenarArray<Carta>(arr: Carta[]): Carta[] {
    const arrayOriginal = arr.concat(arr);
    for (let i = arrayOriginal.length - 1; i > 0; i--) {
      const indiceRandom = Math.floor(Math.random() * (i + 1));
      [arrayOriginal[i], arrayOriginal[indiceRandom]] = [
        arrayOriginal[indiceRandom],
        arrayOriginal[i],
      ];
    }
    return arrayOriginal;
  }

  async seleccionarCarta(carta: Carta, id: number) {
    // 1º voltea la carta
    this.voltearCarta(id);
    // 2º asigna valor a la carta que no tenga
    this.asignarCartas(carta, id);
    // 3º pregunta si tienen valor asignado y compara de ser verdadero
    if (this.tienenValorAsignado()) {
      this.resultadoComparacion = this.compararCartas();

      // 4º si es verdadero las anula si es falso  las vuelve a voltear
      if (this.resultadoComparacion) {
        console.log('Hacer algo porque es Verdadero');
      } else {
        console.log('Hacer algo porque es Falso');
        this.contadorMovimientos++;
        await this.volverAvoltear();
      }
      this.volverValoresIniciales();
    }
  }

  voltearCarta(id: number) {
    const card = document.getElementById('card' + id);
    card!.style.transform =
      card!.style.transform === 'rotateY(180deg)'
        ? 'rotateY(0)'
        : 'rotateY(180deg)';
  }

  asignarCartas(carta: Carta, id: number) {
    if (this.valorCarta1 === '') {
      this.valorCarta1 = carta.valor;
      this.idCarta1 = id;
      return;
    } else if (this.valorCarta2 === '') {
      this.valorCarta2 = carta.valor;
      this.idCarta2 = id;
      return;
    }
  }

  tienenValorAsignado() {
    console.log('Valor carta 1: ', this.valorCarta1);
    console.log('Valor carta 2: ', this.valorCarta2);
    return this.valorCarta1 && this.valorCarta2;
  }

  compararCartas() {
    const sonIguales = this.valorCarta1 === this.valorCarta2;
    console.log('Son iguales?: ', sonIguales);
    return sonIguales;
  }

  volverValoresIniciales() {
    this.valorCarta1 = '';
    this.valorCarta2 = '';
    this.idCarta1 = 0;
    this.idCarta2 = 0;
    this.resultadoComparacion = false;
  }

  volverAvoltear() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.voltearCarta(this.idCarta1);
        this.voltearCarta(this.idCarta2);
        resolve();
      }, 1000);
    });
  }
}
