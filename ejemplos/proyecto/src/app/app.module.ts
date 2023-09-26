import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    // Aqui diremos que cuando alguien pida un UserService se le ofrezca un UserServiceImpl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
