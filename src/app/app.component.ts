import { Component } from '@angular/core';
import { TeatroDBService } from './teatro-db.service';
import { Observable, of, map, Subscription } from 'rxjs';

export class Teatro {
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  datiIn$: Observable<Teatro>;
  teatro: Teatro;
  admin: boolean;
  spettacoloScelto: string;
  nomeUtente: string;
  rapido: boolean;
  conferma1: string;
  conferma2: string;
  sub: Subscription;
  constructor(private TeatroDBService: TeatroDBService) {}

  aggiornaSpettacoli(spettacoliAggiornati: Teatro) {
    this.TeatroDBService.SetPrenotazioni$(
      JSON.stringify(spettacoliAggiornati)
    ).subscribe((ok) => (this.conferma2 = ok + ': spettacoli aggiornati'));
  }
  //prenota al click
  spettacoloChange() {
    //OK
    this.sub = this.datiIn$.subscribe((spettacolo: Teatro) =>
      this.TeatroDBService.SetPrenotazioni$(
        JSON.stringify(spettacolo)
      ).subscribe(
        (val) => (this.conferma1 = val + ': ' + this.nomeUtente + ' aggiunto')
      )
    );
  }
  //recupera lo spettacolo dai dati in ingresso e lo trasforma in observable
  /*getTeatro(rapido: boolean) {
    this.rapido = rapido;
    this.sub = this.datiIn$.subscribe({
      next: (spettacolo: Teatro) =>
        (this.teatro = new Observable((subscriber) =>
          subscriber.next(spettacolo)
        )),
      error: (e) => console.error('' + JSON.stringify(e)),
    });
  }*/
  //recupera i dati dal server
  getDati(admin: boolean) {
    this.admin = admin;
    this.sub = this.TeatroDBService.getPrenotazioni$().subscribe({
      next: (res: string) => {
        this.datiIn$ = of(JSON.parse(res));
        console.log(JSON.parse(res));
      },
      error: (e) =>
        console.error('Observer got an error: ' + JSON.stringify(e)),
    });
  }
  //torna da teatro --> all'inizio
  inizio() {
    this.datiIn$ = undefined;
    this.rapido = undefined;
    this.sub.unsubscribe();
  }
  //torna da teatro --> a login
  indietro() {
    this.spettacoloScelto = undefined;
    this.teatro = undefined;
    this.rapido = undefined;
    this.nomeUtente = undefined;
    this.conferma1 = undefined;
    this.conferma2 = undefined;
  }
}
