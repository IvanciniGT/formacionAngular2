import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DatosDeUsuario } from 'src/app/models/usuario.model';
import { AccionesComponenteUsuario, EstadosComponenteUsuario } from './user.component.states';
import { UsuarioService } from 'src/app/services/user/user.service';
import { BorradoConfirmado, EdicionConfirmada, EdicionSolicitada, BorradoSolicitado, BorradoCancelado, EdicionCancelada, CargaFallida, CargaFinalizada, CargaIniciada } from './user.component.events';
import { UsuarioComponentModel, UsuarioComponentProperties } from './user.component.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentStateMachine } from 'src/app/lib/component.state.machine/component.state.machine';
import { ComponentStateChange } from 'src/app/lib/component.state.machine/component.state.change';

@Component({
  selector: 'usuario',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UsuarioComponent implements OnInit, OnChanges {

  // API del componente

  @Input()
  data!: DatosDeUsuario | number;
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

  readonly acciones = AccionesComponenteUsuario;
  readonly estados = EstadosComponenteUsuario;
  maquinaEstados: ComponentStateMachine<UsuarioComponentProperties, UsuarioComponentModel>;
  datos: UsuarioComponentModel;
  formulario?: FormGroup

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) {
    this.maquinaEstados = new ComponentStateMachine<UsuarioComponentProperties, UsuarioComponentModel>(new UsuarioComponentModel());
    this.datos = this.maquinaEstados.data;
  }

  ngOnInit(): void {
    this.datos = this.maquinaEstados.updateProperties({ userData: typeof this.data === 'number' ? undefined : this.data, userId: typeof this.data === 'number' ? this.data : this.data?.id, deletable: this.borrable, updatable: this.editable });
    // Si me pasan como usuario un  ID numerico, solicitamos los DatosDeUsuario al servicio
    if (this.maquinaEstados.canChangeState(AccionesComponenteUsuario.INICIAR_CARGA_INICIAL)) {
      this.procesarCambioEstado(AccionesComponenteUsuario.INICIAR_CARGA_INICIAL, { userId: this.datos.userId });
      this.usuarioService.getUsuario(this.datos.userId as number).subscribe({
        next: (datosDeUsuario: DatosDeUsuario | undefined) => { // Función si va bien
          if (datosDeUsuario !== undefined) {
            this.procesarCambioEstado(AccionesComponenteUsuario.CARGA_FINALIZADA, { userData: datosDeUsuario });
          } else {
            // TODO, implementar nuevo estado
            console.log('Usuario no encontrado ' + this.datos.userId);
          }
        },
        error: (error: any) => {
          console.log(error)                              // Función si va mal
          this.procesarCambioEstado(AccionesComponenteUsuario.CARGA_FALLIDA, { error: error });
        }
      });
    } else {
      this.procesarCambioEstado(AccionesComponenteUsuario.DATOS_RECIBIDOS_INICIALMENTE, { userId: this.datos.userId, userData: this.datos.userData });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['borrable'] || changes['editable']) {
      this.datos = this.maquinaEstados.updateProperties({ deletable: this.borrable, updatable: this.editable });
    } // todo: userID
  }

  procesarCambioEstado(cambioDeEstado: ComponentStateChange<UsuarioComponentModel, Partial<UsuarioComponentModel>>, newData: Partial<UsuarioComponentModel> = {}) {
    this.datos = this.maquinaEstados.changeState(cambioDeEstado, newData);
    switch (cambioDeEstado) {
      case AccionesComponenteUsuario.INICIAR_CARGA_INICIAL:
        this.cargaIniciada.emit(new CargaIniciada(this.datos.userId as number));
        break;
      case AccionesComponenteUsuario.CARGA_FINALIZADA:
        this.usuarioCargado.emit(new CargaFinalizada(this.datos.userData!));
        break;
      case AccionesComponenteUsuario.DATOS_RECIBIDOS_INICIALMENTE:
        console.log("DATOS_RECIBIDOS_INICIALMENTE", newData)
        break;
      case AccionesComponenteUsuario.CARGA_FALLIDA:
        this.usuarioError.emit(new CargaFallida(this.datos.userId as number)); // TODO Añadir error
        console.log(newData.error)
        break;
      case AccionesComponenteUsuario.INICIAR_EDICION:
        this.crearFormularioEdicion()
        this.edicionIniciada.emit(new EdicionSolicitada(this.datos.userData!));
        break;
      case AccionesComponenteUsuario.INICIAR_BORRADO:
        this.borradoIniciado.emit(new BorradoSolicitado(this.datos.userData!));
        break;
      case AccionesComponenteUsuario.BORRADO_CANCELADO:
        this.borradoCancelado.emit(new BorradoCancelado(this.datos.userData!));
        break;
      case AccionesComponenteUsuario.EDICION_CANCELADA:
      case AccionesComponenteUsuario.CANCELAR_ALMACENAMIENTO_DE_EDICION:
        this.edicionCancelada.emit(new EdicionCancelada(this.datos.userData!));
        break;
      case AccionesComponenteUsuario.BORRADO_CONFIRMADO:
        this.usuarioBorrado.emit(new BorradoConfirmado(this.datos.userData!));
        break;
      case AccionesComponenteUsuario.REINTENTAR_ALMACENAMIENTO:
      case AccionesComponenteUsuario.EDICION_FINALIZADA:
        break
      case AccionesComponenteUsuario.EDICION_ALMACENADA:
        this.usuarioEditado.emit(new EdicionConfirmada(this.datos.userData!));
        break;
      case AccionesComponenteUsuario.ALMACENAMIENTO_FALLIDO:
        console.log(newData.error)
        // Reintentar en 2 segundos
        setTimeout(() => {
          this.procesarCambioEstado(AccionesComponenteUsuario.REINTENTAR_ALMACENAMIENTO);
        }, 2000);
        break
      default:
        console.log("Cambio de estado no controlado", cambioDeEstado)
    }
  }



  crearFormularioEdicion() {
    //his.formulario = new FormGroup({}); // TODO: Crear el formulario
    this.formulario = this.formBuilder.group({
      email: [this.datos.userData?.email, [Validators.required, Validators.email]],
      telefono: [this.datos.userData?.telefono, [Validators.pattern('^(([+][0-9]{0,4}[-])?([0-9]{2,3}[-]?){2,3}[0-9]{2,3})$')]]
      //[Validators.minLength(9), Validators.maxLength(12)] ],
    })
    /*
    this.formulario = new FormGroup({
        email: new FormControl<string>(this.datos.datosDeUsuario!.email, [Validators.required, Validators.email]),
        telefono: new FormControl<string|undefined>(this.datos.datosDeUsuario!.telefono, [Validators.pattern('^(([+][0-9]{0,4}[-])?([0-9]{2,3}[-]?){2,3}[0-9]{2,3})$') ])
    });
    */
  }
  cancelarEdicion(){
    if(this.formulario!.dirty){
      const confirmacion = confirm("¿Estás seguro de que quieres cancelar la edición? Se perderán los cambios")
      if(!confirmacion)
        return;
    }
    this.procesarCambioEstado(this.acciones.EDICION_CANCELADA)
  }
  procesarFormularioEdicion() { // Cuando se haga un submit en el formulario
    //this.formulario!.dirty // Si ha habido cambios
    //this.formulario!.valid // Si es valido
    if(!this.formulario!.valid){
      alert("Formulario no valido. Por favor, revisa los campos")
      return;
    }
    if (this.formulario!.dirty) {
      this.procesarCambioEstado(this.acciones.EDICION_FINALIZADA)
      this.usuarioService.editarUsuario(this.datos.userData!.id,
        {
          email: this.formulario!.get('email')!.value,
          telefono: this.formulario!.get('telefono')!.value
        }
      ).subscribe({
        next: (datosDeUsuario: DatosDeUsuario) => {
          this.procesarCambioEstado(AccionesComponenteUsuario.EDICION_ALMACENADA, { userData: datosDeUsuario });
        },
        error: (error: any) => {
          this.procesarCambioEstado(AccionesComponenteUsuario.ALMACENAMIENTO_FALLIDO, { error: error });
        }
      });
    }else {
      this.procesarCambioEstado(AccionesComponenteUsuario.EDICION_CANCELADA);
    }
  }
}

