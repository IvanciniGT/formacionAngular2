import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DatosDeUsuario } from 'src/app/models/usuario.model';
import { EstadosComponenteUsuario } from './user.component.states';
import { UsuarioComponentState } from './user.component.state';
import { UsuarioService } from 'src/app/services/user/user.service';
import { BorradoConfirmado, EdicionConfirmada, EdicionSolicitada, BorradoSolicitado, BorradoCancelado, EdicionCancelada, CargaFallida, CargaFinalizada, CargaIniciada } from './user.component.events';
import { UsuarioComponentModel } from './user.component.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {

  // API del componente

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
  usuarioEditado = new EventEmitter<EdicionConfirmada>();
  @Output()
  usuarioCargado = new EventEmitter<CargaFinalizada>();
  @Output()
  usuarioError = new EventEmitter<CargaFallida>();
  @Output()
  cargaIniciada = new EventEmitter<CargaIniciada>();
  @Output()
  edicionIniciada = new EventEmitter<EdicionSolicitada>();
  @Output()
  borradoIniciado = new EventEmitter<BorradoSolicitado>();
  @Output()
  borradoCancelado = new EventEmitter<BorradoCancelado>();
  @Output()
  edicionCancelada = new EventEmitter<EdicionCancelada>();

  // Fin del API del componente

  private maquinaEstados: UsuarioComponentState;
  datos:UsuarioComponentModel;
  //datosUsuarioFormulario?: DatosDeUsuario;
  formulario?: FormGroup

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) {
    this.maquinaEstados = new UsuarioComponentState(this.usuario, this.borrable, this.editable);
    this.datos = this.maquinaEstados.modelo;
  }

  crearFormularioEdicion(){
    //his.formulario = new FormGroup({}); // TODO: Crear el formulario
    this.formulario = this.formBuilder.group({
      email: [ this.datos.datosDeUsuario!.email, [Validators.required, Validators.email] ],
      telefono: [ this.datos.datosDeUsuario!.telefono, [Validators.pattern('^(([+][0-9]{0,4}[-])?([0-9]{2,3}[-]?){2,3}[0-9]{2,3})$') ] ]
          //[Validators.minLength(9), Validators.maxLength(12)] ],
    })
  }
  ngOnInit(): void {
    // Si me pasan como usuario un  ID numerico, solicitamos los DatosDeUsuario al servicio
    if (this.maquinaEstados.isInState(EstadosComponenteUsuario.CARGANDO)) {
      this.cargaIniciada.emit(new CargaIniciada(this.usuario));
      this.usuarioService.getUsuario(this.usuario as number).subscribe({
        next: (datosDeUsuario: DatosDeUsuario) => { // Función si va bien
          this.datos = this.maquinaEstados.cargaFinalizada(datosDeUsuario);
          //this.datosUsuarioFormulario = {...this.datos.datosDeUsuario!} // Copia de los datos del usuario. Oportunidad de hacer un CANCELAR
          this.usuarioCargado.emit(new CargaFinalizada(this.usuario));
        },
        error: (error: any) => {
          console.log(error)                              // Función si va mal
          this.datos = this.maquinaEstados.irAError(error);
          this.usuarioError.emit(new CargaFallida(this.usuario));
        }
      });
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['borrable'] || changes['editable']) {
      this.datos = this.maquinaEstados.asignarCaracteristicasDelComponente(this.borrable, this.editable);
    }
  }

  procesarCambioEstado(cambioDeEstado: () => UsuarioComponentModel) {
    this.datos = cambioDeEstado();
    // En funcion del tipo de cambio de estado, lanzar un evento u otro 
    switch (cambioDeEstado) {
      case this.maquinaEstados.cancelarBorrado:
        this.usuarioBorrado.emit(new BorradoCancelado(this.usuario));
        break;
      case this.maquinaEstados.aceptarBorrado:
        this.usuarioBorrado.emit(new BorradoConfirmado(this.usuario));
        break;
      case this.maquinaEstados.iniciarBorrado:
        this.borradoIniciado.emit(new BorradoSolicitado(this.usuario));
        break;
      case this.maquinaEstados.cancelarEdicion:
        this.usuarioBorrado.emit(new EdicionCancelada(this.usuario));
        break;
      case this.maquinaEstados.aceptarEdicion:
        this.usuarioBorrado.emit(new EdicionConfirmada(this.usuario));
        break;
      case this.maquinaEstados.iniciarEdicion:
        this.crearFormularioEdicion();
        this.edicionIniciada.emit(new EdicionSolicitada(this.usuario));
        break;
    }
  }
}
