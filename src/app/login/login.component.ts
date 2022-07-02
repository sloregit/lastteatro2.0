import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Teatro } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() spettacolo: Observable<Teatro>;
  @Input() nomeUtente: string;
  @Output() nomeUtenteChange = new EventEmitter<string>();
  sub: Subscription;
  logged: boolean;
  constructor() {}
  inInput($event: KeyboardEvent) {
    this.nomeUtenteChange.emit((<HTMLInputElement>$event.target).value);
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
