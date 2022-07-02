import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Spettacolo {
  nomeSpettacolo: string;
  teatro: Teatro;
}
export interface Teatro {
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
}
@Injectable()
export class TeatroDBService {
  Key: string = '0ef3f513';
  URL: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';
  constructor(private http: HttpClient) {}
  public getPrenotazioni$(): Observable<string> {
    return this.http.get<string>(this.URL + 'get?key=' + this.Key);
  }
  public SetPrenotazioni$(prenotazioni: string): Observable<string> {
    return this.http.post<string>(
      this.URL + 'set?key=' + this.Key,
      prenotazioni
    );
  }
}
