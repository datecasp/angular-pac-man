import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-celda-juego',
  templateUrl: './celda-juego.component.html',
  styleUrls: ['./celda-juego.component.css']
})
export class CeldaJuegoComponent implements OnInit {
  @Input() id: number = -1;
  @Input() value: number = -1;
  clase: string = '';

  ngOnInit(): void {
    this.paintBoard();
  }

  private paintBoard() {
    switch (this.value) {
      case 0:
        this.clase = 'celda-juego pac-dot';
        break;
      case 1:
        this.clase = 'celda-juego muro';
        break;
      case 2:
        this.clase = 'celda-juego';
        break;
        case 3:
        this.clase = 'celda-juego power-pellet';
        break;
      case 4:
        this.clase = 'celda-juego';
        break;
    }
  }
}
