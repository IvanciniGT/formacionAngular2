import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DatosDeUsuario } from 'src/app/models/usuario.model';
import { EstadosComponenteUsuario } from './user.component.states';
import { UsuarioComponentState } from './user.component.state';
import { UsuarioService } from 'src/app/services/user/user.service';

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
  
  @Output()
  usuarioBorrado = new EventEmitter<BorradoConfirmado>();
  @Output()
  usuarioBorrado = new EventEmitter<BorradoConfirmado>();
  @Output()
  usuarioBorrado = new EventEmitter<BorradoConfirmado>();
  @Output()
  usuarioBorrado = new EventEmitter<BorradoConfirmado>();
  @Output()
  usuarioBorrado = new EventEmitter<BorradoConfirmado>();
  @Output()
  usuarioBorrado = new EventEmitter<BorradoConfirmado>();
  @Output()
  usuarioBorrado = new EventEmitter<BorradoConfirmado>();

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
      this.usuarioService.getUsuario(this.usuario).subscribe({
        next: (datosDeUsuario: DatosDeUsuario) => { // Función si va bien
          this.usuario = datosDeUsuario
          this.estado.cargaFinalizada();
        },
        error: (error: any) => {
          console.log(error)                              // Función si va mal
          this.estado.irAError();
        }
    });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['borrable'] || changes['editable']){
      this.estado.asignarCaracteristicasDelComponente(this.borrable, this.editable);
    }
  }
  procesarCambioEstado(cambioDeEstado){
    cambioDeEstado();
    // En funcion del tipo de cambio de estado, lanzar un evento u otro 
    switch(cambioDeEstado){
      case this.estado.cancelarBorrado:
        this.usuarioBorrado.emit(new BorradoCancelado(this.usuario));
        break;
      case this.estado.aceptarBorrado:
        this.usuarioBorrado.emit(new BorradoConfirmado(this.usuario));
        break;
      case this.estado.cancelarEdicion:
        this.usuarioBorrado.emit(new EdicionCancelada(this.usuario));
        break;
    }
  }
}
