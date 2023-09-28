import { DatosDeUsuario } from "src/app/models/usuario.model";

export class UsuarioComponentEvent {
    readonly usuario?: DatosDeUsuario;
    readonly id: number;
    constructor(usuario: DatosDeUsuario | number){
        if(typeof usuario === 'number'){
            this.id = usuario;
        }else{
            this.id = usuario.id;
            this.usuario = usuario;
        }
    }
}

export class BorradoSolicitado extends UsuarioComponentEvent {}
export class BorradoConfirmado extends UsuarioComponentEvent {}
export class BorradoCancelado extends UsuarioComponentEvent {}

export class EdicionSolicitada extends UsuarioComponentEvent {}
export class EdicionPendienteDeAlmacenar extends UsuarioComponentEvent {}
export class EdicionConfirmada extends UsuarioComponentEvent {}
export class EdicionFallida extends UsuarioComponentEvent {}
export class ReintentoDeAlmacenarEdicion extends UsuarioComponentEvent {}
export class EdicionCancelada extends UsuarioComponentEvent {}

export class CargaFinalizada extends UsuarioComponentEvent {}
export class CargaFallida extends UsuarioComponentEvent {}
export class CargaIniciada extends UsuarioComponentEvent {}

export class Seleccionado extends UsuarioComponentEvent {}
export class Deseleccionado extends UsuarioComponentEvent {}