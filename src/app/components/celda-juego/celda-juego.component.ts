import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-celda-juego',
  templateUrl: './celda-juego.component.html',
  styleUrls: ['./celda-juego.component.css']
})
export class CeldaJuegoComponent implements OnInit {
  @Input() id: number = -1;
  @Input() value: number = -1;
  color: string = '';

  ngOnInit(): void {
    this.paintBoard();
  }

  private paintBoard() {
    switch (this.value) {
      case 1:
        this.color = '#000';
        break;
      case 2:
        this.color = '#FFF';
        break;
      case 0:
        this.color = '#FFF';
        break;
      case 4:
        this.color = '#FFF';
        break;
    }
  }
}
