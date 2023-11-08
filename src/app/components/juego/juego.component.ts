import { Time } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs';
import { Level } from 'src/app/models/level';
import { Player } from 'src/app/models/player';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  level: Level = new Level();
  numeroColumnas: number = -1;
  numCeldas: number = -1;

  constructor(private _juegoService: JuegoService) {}

  ngOnInit(): void {
    this.level = this.InicioJuego(0);
    this.numeroColumnas = this.level.numeroColumnas;
    this.numCeldas = this.level.boardMap.length;

    setTimeout(() => {
      this.InstanciaFantasma(4);
    }, 1000);
  }

  private InicioJuego(idLevel: number): Level {
    return this._juegoService.InicioJuego(idLevel);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this._juegoService.MoverPlayer(event);
  }

  InstanciaFantasma(numero: number, fantasma: number = 0) {
    for (var i = 0; i < numero; i++) {
      this._juegoService.InstanciaFantasma(fantasma, i-2)
      fantasma++;
    }
  }
}
