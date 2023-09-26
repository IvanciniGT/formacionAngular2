import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DatosDeUsuario } from 'src/app/models/usuario.model';
import { EstadosComponenteUsuario } from './user.component.states';
import { UsuarioComponentState } from './user.component.state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges{

  @Input()
  usuario!: DatosDeUsuario | number;

  @Input()
  modoExtendido: boolean = false;

  @Input()
  borrable: boolean = false;

  @Input()
  editable: boolean = false;
  
  estado: UsuarioComponentState;
  
  constructor( private usuarioService: UsuarioService){
    // Calculo el estado inicial del componente
    let estadoInicial: EstadosComponenteUsuario = EstadosComponenteUsuario.CARGANDO;
    if(typeof this.usuario === 'number')
    estadoInicial = EstadosComponenteUsuario.NORMAL;
    // Lo asigno al estado del componente
    this.estado = new UsuarioComponentState(estadoInicial, this.borrable, this.editable);
  }

  ngOnInit(): void {
    // Si me pasan como usuario un  ID numerico, solicitamos los DatosDeUsuario al servicio
    if(this.estado.isInState(EstadosComponenteUsuario.CARGANDO)){
      usuarioService.getUsuario(this.usuario).subscribe(
        (datosDeUsuario: DatosDeUsuario) => this.usuario = datosDeUsuario // Función si va bien
        , (error: any) => console.log(error)                              // Función si va mal
      );
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['borrable'] || changes['editable']){
      this.estado.asignarCaracteristicasDelComponente(this.borrable, this.editable);
    }
  }
}
