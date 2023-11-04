import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { JuegoService } from './services/juego.service';

import { AppComponent } from './app.component';
import { UIComponent } from './components/ui/ui.component';
import { JuegoComponent } from './components/juego/juego.component';
import { MenuJuegoComponent } from './components/menu-juego/menu-juego.component';
import { CeldaJuegoComponent } from './components/celda-juego/celda-juego.component';

@NgModule({
  declarations: [
    AppComponent,
    UIComponent,
    JuegoComponent,
    MenuJuegoComponent,
    CeldaJuegoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [JuegoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
