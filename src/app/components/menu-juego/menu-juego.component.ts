import { Component, OnInit } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';


@Component({
  selector: 'app-menu-juego',
  templateUrl: './menu-juego.component.html',
  styleUrls: ['./menu-juego.component.css']
})
export class MenuJuegoComponent implements OnInit {
  score: number = 0;
  lifes: number = 3;

  constructor(private _juegoService: JuegoService){}
  
  ngOnInit(): void {
    this._juegoService.GetScoreObservable().subscribe((nuevoScore) => {
      this.score = nuevoScore;
    });
  }

  VolverAJugar(){
    this._juegoService.VolverAJugar(0);
  }
}
