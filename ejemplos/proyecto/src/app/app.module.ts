import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AccionConfirmableComponent } from './components/accion.confirmable/accion.confirmable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioFakeService } from './services/user/impl/user.fake.service';
import { UsuarioService } from './services/user/user.service';
import { UsuarioComponent } from './components/user/user.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { StoreModule } from '@ngrx/store';
import { MiAppStore } from './state/miapp.store';
import { ComponenteA } from './components/componente-a/a.component';
import { ComponenteB } from './components/componente-b/b.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    AccionConfirmableComponent,
    UserlistComponent,
    ComponenteA,
    ComponenteB
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule, // Quiero trabajar con formularios reactivos
    HttpClientModule, StoreModule.forRoot({}, {}), // Quiero trabajar con peticiones HTTP desde Angular
    MiAppStore
  ],
  providers: [
    // Aqui diremos que cuando alguien pida un UserService se le ofrezca un UserServiceImpl
    { provide: UsuarioService, useClass: UsuarioFakeService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
