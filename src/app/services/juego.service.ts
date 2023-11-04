import { Injectable } from '@angular/core';
import { Level } from '../models/level';
import { Levels } from '../levels/levels';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  levels: Level[] = [];

  constructor() {
    //Asigna los niveles de la clase Levels
    this.levels = Levels;
  }

  public GetLevel(id: number): Level {
    return this.levels[id];
  }
}
