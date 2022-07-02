import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Spettacolo } from '../app.component';

export class Prenotazione {
  zona: string;
  nome: string;
  fila: number;
  posto: number;
  constructor(zona: string, nome: string, fila: number, posto: number) {
    this.zona = zona;
    this.nome = nome;
    this.fila = fila;
    this.posto = posto;
  }
}

export class Selezione {
  selezionati: Array<Prenotazione>;
  constructor() {
    this.selezionati = [];
  }
  aggiungi(prenotazione: Prenotazione) {
    this.selezionati.push(prenotazione);
  }
  rimuovi(fila: number, posto: number) {
    this.selezionati.map((old, i) => {
      if (old.fila === fila && old.posto === posto) {
        this.selezionati.splice(i, 1);
      }
    });
  }
}

@Component({
  selector: 'app-sala-teatro',
  templateUrl: './sala-teatro.component.html',
  styleUrls: ['./sala-teatro.component.css'],
})
export class SalaTeatroComponent implements OnInit {
  @Input() rapido: boolean;
  @Input() spettacolo: Observable<Spettacolo>;
  @Output() spettacoloChange = new EventEmitter<Observable<Spettacolo>>();
  @Input() nomeUtente: string;
  nomeSpettacolo: string;
  nomePosto: string;
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
  prenotato: boolean;
  newPrenotazione: Prenotazione;
  prenotaGruppo: Selezione;
  selezionato: boolean;
  sub: Subscription;
  constructor() {
    if (!this.rapido) {
      this.prenotaGruppo = new Selezione();
    }
  }

  //mappa i selezionati e aggiorna lo spettacolo
  confermaPrenotazioni() {
    this.sub = this.spettacolo.subscribe((spettacolo: Spettacolo) => {
      this.prenotaGruppo.selezionati.map(
        (prenotazione: Prenotazione) =>
          (spettacolo.teatro[prenotazione.zona][prenotazione.fila][
            prenotazione.posto
          ] = prenotazione.nome)
      );
    });
    this.prenotato = true;
    this.spettacoloChange.emit(this.spettacolo);
  }
  //crea il gruppo di prenotazioni
  seleziona(zona: string, fila: number, posto: number) {
    this.newPrenotazione = new Prenotazione(zona, this.nomeUtente, fila, posto);
    if (this.selezionato === true) {
      this.prenotaGruppo.aggiungi(this.newPrenotazione);
    } else {
      this.prenotaGruppo.rimuovi(fila, posto);
    }
  }
  //prenotazione Veloce
  prenotaVeloce(zona: string, fila: number, posto: number) {
    this.sub = this.spettacolo.subscribe(
      (spettacolo: Spettacolo) =>
        (spettacolo.teatro[zona][fila][posto] = this.nomeUtente)
    );
    this.prenotato = true;
    this.spettacoloChange.emit(this.spettacolo);
  }
  //mostra il nome del posto prenotato
  mostraNome($event: string) {
    this.nomePosto = $event;
  }
  //invocata subito dopo il caricamento del component
  ngOnInit() {
    this.sub = this.spettacolo.subscribe((spettacolo: Spettacolo) => {
      this.platea = spettacolo.teatro.platea;
      this.palco = spettacolo.teatro.palco;
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
