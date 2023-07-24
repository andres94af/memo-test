import { Component } from '@angular/core';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/service/carta.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent {

  cartas:Carta[] = [];

  constructor(private cartaService:CartaService){
    this.obtenerCartas();
  }

  obtenerCartas(){
    this.cartaService.obtenerCartas().subscribe({
      next: cartas => {
        this.cartas = Object.values(cartas);
        this.cartas = this.duplicarYDesordenarArray(this.cartas);
      },
      error: err => console.log(err)
    });
  }

  duplicarYDesordenarArray<Carta>(arr: Carta[]): Carta[] {
    const arrayOriginal = arr.concat(arr);
    for (let i = arrayOriginal.length - 1; i > 0; i--) {
      const indiceRandom = Math.floor(Math.random() * (i + 1));
      [arrayOriginal[i], arrayOriginal[indiceRandom]] = [arrayOriginal[indiceRandom], arrayOriginal[i]];
    }
    return arrayOriginal;
  }

  flipCard(id:number) {
    const card = document.getElementById("card"+id);
    card!.style.transform = card!.style.transform === "rotateY(180deg)" ? "rotateY(0)" : "rotateY(180deg)";
  }
}
