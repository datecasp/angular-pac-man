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

    this._juegoService.GetLevelObservable().subscribe((nuevoLevel) => {
      this.level = nuevoLevel;
    });

    this.SacaFantasmasInit();

    setTimeout(() => {
      setInterval(() => {
        this.MueveFantasmas(0);
      }, 250);
      setInterval(() => {
        this.MueveFantasmas(1);
      }, 350);
      setInterval(() => {
        this.MueveFantasmas(2);
      }, 300);
      setInterval(() => {
        this.MueveFantasmas(3);
      }, 400);
    }, 1500);
  }

  private InicioJuego(idLevel: number): Level {
    return this._juegoService.InicioJuego(idLevel);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this._juegoService.MoverPlayer(event);
  }

  SacaFantasmasInit() {
    this._juegoService.SacaFantasmasInit();
  }

  MueveFantasmas(fantasmaId: number) {
    this._juegoService.MueveFantasma(fantasmaId);
  }
}
