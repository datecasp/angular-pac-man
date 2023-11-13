import { Injectable } from '@angular/core';
import { Level } from '../models/level';
import { Levels } from '../levels/levels';
import { Subject } from 'rxjs';

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
      this.InstanciaFantasma(0);
    }, 1500);
    setTimeout(() => {
      this.InstanciaFantasma(1);
    }, 2000);
    setTimeout(() => {
      this.InstanciaFantasma(2);
    }, 2500);
    setTimeout(() => {
      this.InstanciaFantasma(3);
    }, 3000);
  }

  InstanciaFantasma(fantasma: number) {
    this.CheckMoverFantasma(
      this.level.fantasmasInitPos[fantasma]
    );
    this.level.boardMap[this.level.fantasmasInitPos[fantasma]] = 6 + fantasma;
  }

  public CheckMoverFantasma(posFantasma: number) {
    if (this.level.boardMap[posFantasma] === 5) {
      this.playerCanMove = false;
      setTimeout(() => {
        alert('Pausa de 1 segundo completada. Ahora puedes continuar.');
      }, 1000);
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
              this.GameOver();
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
              this.GameOver();
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
              this.GameOver();
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
              this.GameOver();
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

  public GameOver() {
    this.playerCanMove = false;
    alert('Game Over!!');
  }
}
