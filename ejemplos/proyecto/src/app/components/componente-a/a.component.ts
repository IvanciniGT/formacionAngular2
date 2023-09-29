import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { accionEstablecerTexto } from 'src/app/state/texto/texto.actions';
import { TextoState } from 'src/app/state/texto/texto.state';

@Component({
  selector: 'componente-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class ComponenteA{

  constructor(private store: Store<{texto: TextoState}>) { }

  enviar(valor:string){
    console.log("Enviando: " + valor);
    this.store.dispatch(accionEstablecerTexto({texto: valor})); //Cambiamos el estado global
  }
}