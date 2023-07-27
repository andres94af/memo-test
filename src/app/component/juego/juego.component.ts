import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
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
  intervalo: any;

  contadorMovimientos: number = 0;
  contadorAciertos:number = 0;

  valorCarta1: string = '';
  idCarta1: number = 0;

  valorCarta2: string = '';
  idCarta2: number = 0;

  resultadoComparacion: boolean = false;

  constructor(private cartaService: CartaService, private router:Router) {
    this.obtenerCartas();
    this.iniciarContador();
  }

  obtenerCartas() {
    this.cartaService.obtenerCartas().subscribe({
      next: (cartas) => {
        this.cartas = Object.values(cartas);
        this.cartas = this.prepararCartas(this.cartas);
      },
      error: (err) => console.log(err),
    });
  }

  async seleccionarCarta(carta: Carta, id: number) {
    this.voltearCarta(id);
    this.asignarCartas(carta, id);
    
    if (this.tienenValorAsignado()) {
      this.resultadoComparacion = this.compararCartas();
      if (this.resultadoComparacion) {
        this.contadorAciertos++;
        await this.inactivarCartas();
      } else {
        await this.volverAvoltear();
      }
      this.contadorMovimientos++;
      this.volverValoresIniciales();
    }

    if (this.contadorAciertos === 12) {
      this.finalizarJuego();
    }
  }
  finalizarJuego() {
    var jugador = prompt('Lo lograste! Ingresa tu nombre', 'Jugador');
    alert('Felicidades '+ jugador +'! Hiciste '+ this.contadorMovimientos +' movimientos. Tu tiempo fue: '+ this.tiempoFormateado());
    this.cartaService.agregarGanador(jugador!, this.contadorMovimientos, this.tiempoFormateado());
    this.router.navigate(['']);
  }

  voltearCarta(id: number) {
    const card = document.getElementById('tarjeta' + id);
    card!.style.transform =
      card!.style.transform === 'rotateY(180deg)'
        ? 'rotateY(0)'
        : 'rotateY(180deg)';
  }

  inactivarCartas(){
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const card1 = document.getElementById('frente' + this.idCarta1);
        const card2 = document.getElementById('frente' + this.idCarta2);
        card1?.classList.add('inactivo');
        card2?.classList.add('inactivo');
        resolve();
      }, 1000);
    });
  }

  asignarCartas(carta: Carta, id: number) {
    if (this.valorCarta1 === '') {
      this.valorCarta1 = carta.valor;
      this.idCarta1 = id;
    } else if (this.valorCarta2 === '') {
      this.valorCarta2 = carta.valor;
      this.idCarta2 = id;
    }
  }

  tienenValorAsignado() {
    return this.valorCarta1 !='' && this.valorCarta2 != '';
  }

  compararCartas() {
    const sonIguales = this.valorCarta1 === this.valorCarta2;
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

  iniciarContador() {
    this.intervalo = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  detenerContador() {
    clearInterval(this.intervalo);
  }

  tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempo / 60);
    const segundos = this.tiempo % 60;

    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }

  reiniciar(){
    window.location.reload();
  }

  desordenarCartas(cartas:Carta[]){
    const arrayOriginal = cartas;
    for (let i = arrayOriginal.length - 1; i > 0; i--) {
      const indiceRandom = Math.floor(Math.random() * (i + 1));
      [arrayOriginal[i], arrayOriginal[indiceRandom]] = [
        arrayOriginal[indiceRandom],
        arrayOriginal[i],
      ];
    }
    return arrayOriginal;
  }

  prepararCartas(cartas:Carta[]){
    cartas = this.desordenarCartas(cartas);
    cartas = cartas.slice(0,12);
    cartas = cartas.concat(cartas);
    cartas = this.desordenarCartas(cartas);
    return cartas;
  }

  @HostListener('window:beforeunload', ['$event'])
  antesDeSalirDeLaPagina($event: any) {
    $event.returnValue = true;
  }
}
