import { Injectable } from '@angular/core';
import { Level } from '../models/level';
import { Levels } from '../data/levels';
import { Subject } from 'rxjs';
import { Ghost } from '../models/ghost';
import { Ghosts } from '../data/ghosts';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  level: Level = new Level();
  private levelObs = new Subject<Level>();
  spreadLevel: Level = new Level();
  levels: Level[] = [];
  numCeldas: number = -1;
  score: number = 0;
  private scoreObs = new Subject<number>();
  playerCanMove: boolean = true;
  primeraCarga: boolean = true;
  fantasma0: Ghost = new Ghost();
  fantasma1: Ghost = new Ghost();
  fantasma2: Ghost = new Ghost();
  fantasma3: Ghost = new Ghost();

  constructor() {
    //Asigna los niveles de la clase Levels
    this.levels = Levels;
  }

  public GetLevel(idLevel: number): Level {
    //Posiciona a Player en su posición de inicio
    this.levels[idLevel].boardMap[this.levels[idLevel].playerPosicion] = 5;
    this.level = Levels[idLevel];
    if (this.primeraCarga) {
      this.primeraCarga = false;
      this.spreadLevel = JSON.parse(JSON.stringify(this.level));
    }
    this.numCeldas = this.level.boardMap.length;
    return this.level;
  }

  public InicioJuego(idLevel: number): Level {
    this.playerCanMove = true;
    return this.GetLevel(idLevel);
  }

  public VolverAJugar(idLevel: number) {
    this.playerCanMove = true;
    this.level = JSON.parse(JSON.stringify(this.spreadLevel));
    this.level.boardMap[this.level.playerPosicion] = 5;
    this.levelObs.next(this.level);
    this.SacaFantasmasInit();
  }

  GetLevelObservable() {
    return this.levelObs.asObservable();
  }

  SacaFantasmasInit() {
    setTimeout(() => {
      this.fantasma0 = Ghosts[0];
      this.fantasma0.posicion = this.level.fantasmasInitPos[0];
      this.fantasma0.celdaAnterior =
        this.level.boardMap[this.fantasma0.posicion];
      this.PintaFantasma(this.fantasma0);
    }, 1500);
    setTimeout(() => {
      this.fantasma1 = Ghosts[1];
      this.fantasma1.posicion = this.level.fantasmasInitPos[1];
      this.fantasma1.celdaAnterior =
        this.level.boardMap[this.fantasma1.posicion];
      this.PintaFantasma(this.fantasma1);
    }, 2000);
    setTimeout(() => {
      this.fantasma2 = Ghosts[2];
      this.fantasma2.posicion = this.level.fantasmasInitPos[2];
      this.fantasma2.celdaAnterior =
        this.level.boardMap[this.fantasma2.posicion];
      this.PintaFantasma(this.fantasma2);
    }, 2500);
    setTimeout(() => {
      this.fantasma3 = Ghosts[3];
      this.fantasma3.posicion = this.level.fantasmasInitPos[3];
      this.fantasma3.celdaAnterior =
        this.level.boardMap[this.fantasma3.posicion];
      this.PintaFantasma(this.fantasma3);
    }, 3000);
  }

  PintaFantasma(fantasma: Ghost) {
    this.CheckMoverFantasma(fantasma.posicion);
    this.level.boardMap[fantasma.posicion] = 6 + fantasma.id;
  }

  public CheckMoverFantasma(posFantasma: number): boolean {
    if (this.level.boardMap[posFantasma] === 5) {
      this.GameOver(0);
    } else if (
      this.level.boardMap[posFantasma] > 5 ||
      this.level.boardMap[posFantasma] === 1
    ) {
      return false;
    }

    return true;
  }

  public MueveFantasma(idFantasma: number) {
    if (idFantasma === 0) {
      this.MoverFantasma(this.fantasma0);
    }
    if (idFantasma === 1) {
      this.MoverFantasma(this.fantasma1);
    }
    if (idFantasma === 2) {
      this.MoverFantasma(this.fantasma2);
    }
    if (idFantasma === 3) {
      this.MoverFantasma(this.fantasma3);
    }
  }

  private MoverFantasma(fantasma: Ghost) {
    var direccion = Math.floor(Math.random() * 4);
    switch (direccion) {
      case 0: //Arriba
        if (
          this.CheckMoverFantasma(fantasma.posicion - this.level.numeroColumnas)
        ) {
          this.level.boardMap[fantasma.posicion] = fantasma.celdaAnterior;
          fantasma.celdaAnterior =
            this.level.boardMap[fantasma.posicion - this.level.numeroColumnas];
          fantasma.posicion = fantasma.posicion - this.level.numeroColumnas;
          this.level.boardMap[fantasma.posicion] =
            6 + fantasma.id;
        }
        break;
      case 1: //Abajo
        if (
          this.CheckMoverFantasma(fantasma.posicion + this.level.numeroColumnas)
        ) {
          this.level.boardMap[fantasma.posicion] = fantasma.celdaAnterior;
          fantasma.celdaAnterior =
            this.level.boardMap[fantasma.posicion + this.level.numeroColumnas];
          fantasma.posicion = fantasma.posicion + this.level.numeroColumnas;
          this.level.boardMap[fantasma.posicion] =
            6 + fantasma.id;
        }
        break;
      case 2: //Izquierda
        if (this.CheckMoverFantasma(fantasma.posicion - 1)) {
          this.level.boardMap[fantasma.posicion] = fantasma.celdaAnterior;
          fantasma.celdaAnterior = this.level.boardMap[fantasma.posicion - 1];
          fantasma.posicion = fantasma.posicion - 1;
          this.level.boardMap[fantasma.posicion] = 6 + fantasma.id;
        }
        break;
      case 3: //Derecha
        if (this.CheckMoverFantasma(fantasma.posicion + 1)) {
          this.level.boardMap[fantasma.posicion] = fantasma.celdaAnterior;
          fantasma.celdaAnterior = this.level.boardMap[fantasma.posicion + 1];
          fantasma.posicion = fantasma.posicion + 1;
          this.level.boardMap[fantasma.posicion] = 6 + fantasma.id;
        }
    }
  }

  public MoverPlayer(e: KeyboardEvent) {
    if (this.playerCanMove) {
      var posicionAnterior;
      var numeroFilas = this.level.boardMap.length / this.level.numeroColumnas;
      switch (e.key) {
        case 'q':
          posicionAnterior = this.level.playerPosicion;
          if (this.level.playerPosicion - numeroFilas < 0) {
            this.level.playerPosicion +=
              this.level.numeroColumnas * numeroFilas;
          }
          if (
            this.level.boardMap[
              this.level.playerPosicion - this.level.numeroColumnas
            ] !== 1
          ) {
            if (
              this.level.boardMap[
                this.level.playerPosicion - this.level.numeroColumnas
              ] > 5 //fantasma
            ) {
              this.GameOver(0);
            } else if (
              this.level.boardMap[
                this.level.playerPosicion - this.level.numeroColumnas
              ] == 0 //coin
            ) {
              this.AddScore(10);
            } else if (
              this.level.boardMap[
                this.level.playerPosicion - this.level.numeroColumnas
              ] === 3 //power-coin
            ) {
              this.AddScore(25);
            }
            this.level.boardMap[
              this.level.playerPosicion - this.level.numeroColumnas
            ] = 5;
            this.level.boardMap[posicionAnterior] = 2;
            this.level.playerPosicion =
              this.level.playerPosicion - this.level.numeroColumnas;
          }
          break;
        case 'a':
          posicionAnterior = this.level.playerPosicion;
          if (
            this.level.playerPosicion + numeroFilas >
            this.level.boardMap.length
          ) {
            this.level.playerPosicion -=
              this.level.numeroColumnas * numeroFilas;
          }
          if (
            this.level.boardMap[
              this.level.playerPosicion + this.level.numeroColumnas
            ] !== 1
          ) {
            if (
              this.level.boardMap[
                this.level.playerPosicion + this.level.numeroColumnas
              ] > 5 //fantasma
            ) {
              this.GameOver(0);
            } else if (
              this.level.boardMap[
                this.level.playerPosicion + this.level.numeroColumnas
              ] === 0
            ) {
              this.AddScore(10);
            } else if (
              this.level.boardMap[
                this.level.playerPosicion + this.level.numeroColumnas
              ] === 3
            ) {
              this.AddScore(25);
            }
            this.level.boardMap[
              this.level.playerPosicion + this.level.numeroColumnas
            ] = 5;
            this.level.boardMap[posicionAnterior] = 2;
            this.level.playerPosicion =
              this.level.playerPosicion + this.level.numeroColumnas;
          }
          break;
        case 'p':
          posicionAnterior = this.level.playerPosicion;
          if (
            (this.level.playerPosicion + 1) % this.level.numeroColumnas ==
            0
          ) {
            this.level.playerPosicion -= this.level.numeroColumnas;
          }
          if (this.level.boardMap[this.level.playerPosicion + 1] !== 1) {
            if (
              this.level.boardMap[this.level.playerPosicion + 1] > 5 //fantasma
            ) {
              this.GameOver(0);
            } else if (
              this.level.boardMap[this.level.playerPosicion + 1] === 0
            ) {
              this.AddScore(10);
            } else if (
              this.level.boardMap[this.level.playerPosicion + 1] === 3
            ) {
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
            if (
              this.level.boardMap[this.level.playerPosicion - 1] > 5 //fantasma
            ) {
              this.GameOver(0);
            } else if (
              this.level.boardMap[this.level.playerPosicion - 1] === 0
            ) {
              this.AddScore(10);
            } else if (
              this.level.boardMap[this.level.playerPosicion - 1] === 3
            ) {
              this.AddScore(25);
            }
            this.level.boardMap[this.level.playerPosicion - 1] = 5;
            this.level.boardMap[posicionAnterior] = 2;
            this.level.playerPosicion = this.level.playerPosicion - 1;
          }
          break;
      }
    }
  }

  public AddScore(add: number) {
    this.score += add;
    this.scoreObs.next(this.score);
  }

  public GetScoreObservable() {
    return this.scoreObs.asObservable();
  }

  public GameOver(idLevel: number) {
    this.playerCanMove = false;
    alert('Game Over!!');
    this.InicioJuego(idLevel);
  }
}
