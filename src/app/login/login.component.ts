import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeatroDBService } from '../teatro-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Key: string = '0ef3f513';
  chiaveUtente: string;
  @Output() chiaveUtenteEmitter = new EventEmitter<string>();
  constructor() {}
  accedi() {
    this.chiaveUtenteEmitter.emit(this.chiaveUtente);
  }
  ngOnInit() {}
}
