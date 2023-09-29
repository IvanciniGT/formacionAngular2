import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { EstadoGlobalApp } from 'src/app/state/global.state';
import { accionEstablecerTexto } from 'src/app/state/texto/texto.actions';
import { TextoState } from 'src/app/state/texto/texto.state';

@Component({
  selector: 'componente-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class ComponenteB implements OnInit{

  textoEstablecido$: Observable<string | null> = of(null)

  constructor(private store: Store<{texto: TextoState}>) { }
                                 //<EstadoGlobalApp>

  ngOnInit(){
    this.textoEstablecido$ = this.store.select(
      state => {
        console.log("Recibido: " + state.texto.valor, state);
        return state.texto.valor;
      }
    );
  }
}