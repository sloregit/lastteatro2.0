import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Spettacolo } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() spettacoli: Observable<Array<Spettacolo>>;
  @Input() spettacoloScelto: string;
  @Input() nomeUtente: string;
  @Output() spettacoloSceltoChange = new EventEmitter<string>();
  @Output() nomeUtenteChange = new EventEmitter<string>();
  nomiSpettacoli: Array<string>;
  sub: Subscription;
  logged: boolean;
  constructor() {
    this.nomiSpettacoli = new Array();
  }
  seleziona($event: Event) {
    this.spettacoloSceltoChange.emit((<HTMLSelectElement>$event.target).value);
  }
  inInput($event: KeyboardEvent) {
    this.nomeUtenteChange.emit((<HTMLInputElement>$event.target).value);
  }
  ngOnInit() {
    //filtra e inserisce nell'array solo i nomi degli spettacoli
    this.sub = this.spettacoli.subscribe((spettacoli: Array<Spettacolo>) => {
      spettacoli.map((spettacolo: Spettacolo) =>
        this.nomiSpettacoli.push(spettacolo.nomeSpettacolo)
      );
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
