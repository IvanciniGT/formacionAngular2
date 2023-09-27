import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AccionConfirmableComponent } from './components/accion.confirmable/accion.confirmable.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AccionConfirmableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule, // Quiero trabajar con formularios reactivos
    HttpClientModule // Quiero trabajar con peticiones HTTP desde Angular
  ],
  providers: [
    // Aqui diremos que cuando alguien pida un UserService se le ofrezca un UserServiceImpl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
