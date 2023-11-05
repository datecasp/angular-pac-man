import { Injectable } from '@angular/core';
import { Level } from '../models/level';
import { Levels } from '../levels/levels';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  level: Level = new Level();
  levels: Level[] = [];
  previousScore: number = 0;
  private score = new Subject<number>();

  constructor() {
    //Asigna los niveles de la clase Levels
    this.levels = Levels;
  }

  public GetLevel(id: number): Level {
    //Posiciona a Player en su posición de inicio
    this.levels[id].boardMap[this.levels[id].playerPosicion] = 5;
    this.level = Levels[id];
    return this.level;
  }

  public InicioJuego(idLevel: number): Level {
    return this.GetLevel(idLevel);
  }

  public MoverPlayer(e: KeyboardEvent) {
    var posicionAnterior;
    var numeroFilas = this.level.boardMap.length / this.level.numeroColumnas;
    switch (e.key) {
      case 'q':
        posicionAnterior = this.level.playerPosicion;
        if (this.level.playerPosicion - numeroFilas < 0) {
          this.level.playerPosicion += this.level.numeroColumnas * numeroFilas;
        }
        if (this.level.boardMap[this.level.playerPosicion - this.level.numeroColumnas] !== 1) {
          if (this.level.boardMap[this.level.playerPosicion - this.level.numeroColumnas] == 0) {
            this.AddScore(10);
          }
          else if (this.level.boardMap[this.level.playerPosicion - this.level.numeroColumnas] === 3) {
            this.AddScore(25);
          }
          this.level.boardMap[this.level.playerPosicion - this.level.numeroColumnas] = 5;
          this.level.boardMap[posicionAnterior] = 2;
          this.level.playerPosicion = this.level.playerPosicion - this.level.numeroColumnas;
        }
        break;
      case 'a':
        posicionAnterior = this.level.playerPosicion;
        if (this.level.playerPosicion + numeroFilas > this.level.boardMap.length) {
          this.level.playerPosicion -= this.level.numeroColumnas * numeroFilas;
        }
        if (this.level.boardMap[this.level.playerPosicion + this.level.numeroColumnas] !== 1) {
          if (this.level.boardMap[this.level.playerPosicion + this.level.numeroColumnas] === 0) {
            this.AddScore(10);
          }
          else if (this.level.boardMap[this.level.playerPosicion + this.level.numeroColumnas] === 3) {
            this.AddScore(25);
          }
          this.level.boardMap[this.level.playerPosicion + this.level.numeroColumnas] = 5;
          this.level.boardMap[posicionAnterior] = 2;
          this.level.playerPosicion = this.level.playerPosicion + this.level.numeroColumnas;
        }
        break;
      case 'p':
        posicionAnterior = this.level.playerPosicion;
        if ((this.level.playerPosicion + 1) % this.level.numeroColumnas == 0) {
          this.level.playerPosicion -= this.level.numeroColumnas;
        }
        if (this.level.boardMap[this.level.playerPosicion + 1] !== 1) {
          if (this.level.boardMap[this.level.playerPosicion + 1] === 0) {
            this.AddScore(10);
          }
          else if (this.level.boardMap[this.level.playerPosicion + 1] === 3) {
            this.AddScore(25);
          }
          this.level.boardMap[this.level.playerPosicion + 1] = 5;
          this.level.boardMap[posicionAnterior] = 2;
          this.level.playerPosicion = this.level.playerPosicion + 1;
        }
        break;
      case 'o':
        posicionAnterior = this.level.playerPosicion;
        if (this.level.playerPosicion % this.level.numeroColumnas == 0) {
          this.level.playerPosicion += this.level.numeroColumnas;
        }
        if (this.level.boardMap[this.level.playerPosicion - 1] !== 1) {
          if (this.level.boardMap[this.level.playerPosicion - 1] === 0) {
            this.AddScore(10);
          }
          else if (this.level.boardMap[this.level.playerPosicion - 1] === 3) {
            this.AddScore(25);
          }
          this.level.boardMap[this.level.playerPosicion - 1] = 5;
          this.level.boardMap[posicionAnterior] = 2;
          this.level.playerPosicion = this.level.playerPosicion - 1;
        }
        break;
    }
  }

  public AddScore(add: number) {
    this.previousScore += add;
    this.score.next(this.previousScore);
  }

  public GetScoreObservable() {
    return this.score.asObservable();
  }


}
