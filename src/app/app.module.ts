import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//
import { AppComponent } from './app.component';
import { TeatroDBService } from './teatro-db.service';
import { LoginComponent } from './login/login.component';
import { GestioneComponent } from './gestione/gestione.component';
import { SalaTeatroComponent } from './sala-teatro/sala-teatro.component';
import { PulsanteComponent } from './pulsante/pulsante.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    LoginComponent,
    SalaTeatroComponent,
    PulsanteComponent,
    GestioneComponent,
  ],
  bootstrap: [AppComponent],
  providers: [TeatroDBService],
})
export class AppModule {}
