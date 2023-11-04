import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/models/level';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  level: Level = new Level();
  readonly numeroColumnas: number = 28;

  constructor(private _juegoService: JuegoService) { }

  ngOnInit(): void {
    this.level = this._juegoService.GetLevel(0);
  }


}
