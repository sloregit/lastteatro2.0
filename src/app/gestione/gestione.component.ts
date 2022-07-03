import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Teatro } from '../app.component';

export class nuovoSpettacolo extends Teatro {
  nomeSpettacolo: string;
  teatro: Teatro;
  constructor() {
    super();
  }
  //genera un nuovo spettacolo vuoto con nome
  genera(
    filePlatea: number,
    postiPlatea: number,
    filePalco: number,
    postipalco: number
  ) {
    this.teatro = new Teatro();
    this.teatro.platea = Array(filePlatea)
      .fill('fila')
      .map(() =>
        Array(postiPlatea)
          .fill('posto')
          .map(() => {
            return undefined;
          })
      );
    this.teatro.palco = Array(filePalco)
      .fill('fila')
      .map(() =>
        Array(postipalco)
          .fill('posto')
          .map(() => {
            return undefined;
          })
      );
  }
}

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.css'],
})
export class GestioneComponent implements OnInit {
  @Input() spettacoliIn$: Observable<Array<Teatro>>;
  @Output() spettacoliEmitter = new EventEmitter();
  spettacoli: Teatro;
  newSpettacolo: nuovoSpettacolo;
  filePlateaMax;
  postiPlateaMax;
  filePalchiMax;
  postiPalchiMax;
  elemPlatea: Array<number>;
  elemPalco: Array<number>;
  filePlatea: number;
  postiPlatea: number;
  filePalco: number;
  postiPalco: number;
  showNomi: boolean;
  sub: Subscription;
  constructor() {
    this.filePlateaMax = new Array(7);
    this.postiPlateaMax = new Array(10);
    this.filePalchiMax = new Array(6);
    this.postiPalchiMax = new Array(4);
  }
  conferma() {
    this.newSpettacolo = new nuovoSpettacolo();
    this.newSpettacolo.genera(
      this.filePlatea,
      this.postiPlatea,
      this.filePalco,
      this.postiPalco
    );
    this.spettacoliEmitter.emit();
  }
  vediSpettacoli() {
    this.showNomi = true;
  }
  nascondi() {
    this.showNomi = false;
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
