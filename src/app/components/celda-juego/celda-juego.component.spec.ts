import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeldaJuegoComponent } from './celda-juego.component';

describe('CeldaJuegoComponent', () => {
  let component: CeldaJuegoComponent;
  let fixture: ComponentFixture<CeldaJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CeldaJuegoComponent]
    });
    fixture = TestBed.createComponent(CeldaJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
