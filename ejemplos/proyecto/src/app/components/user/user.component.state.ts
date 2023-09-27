import { DatosDeUsuario } from 'src/app/models/usuario.model';
import { EstadosComponenteUsuario } from './user.component.states';
import { UsuarioComponentModel } from './user.component.model';

// Posibles #estados (ACCESIBLES DESDE FUERA)
export class UsuarioComponentState {
    
    #modelo: UsuarioComponentModel;

    constructor( usuario: DatosDeUsuario | number, borrable: boolean, editable: boolean ){
        this.#modelo = this.inicializarModelo(usuario, borrable, editable);
        if(typeof usuario === 'number'){
            this.#cambiarEstado(EstadosComponenteUsuario.CARGANDO, () => true);
        }else{
            this.#cambiarEstado(EstadosComponenteUsuario.NORMAL, () => true);
        }
    }
    private inicializarModelo( usuario: DatosDeUsuario | number, borrable: boolean, editable: boolean ){
        return {
            estado: EstadosComponenteUsuario.INICIO,
            borrable: borrable,
            editable: editable,
            id: typeof usuario === 'number' ? usuario : usuario.id,
            datosDeUsuario: typeof usuario === 'number' ? undefined : usuario,
        }
    }
    private actualizarModelo( nuevosDatos:{
        estado?: EstadosComponenteUsuario,
        borrable?: boolean,
        editable?: boolean,
        id?: number,
        error?: Error,
        datosDeUsuario?: DatosDeUsuario,
    }){
        this.#modelo = Object.freeze({...this.#modelo, ...nuevosDatos});
        return this.#modelo;
    }
    get modelo(): UsuarioComponentModel {
        return Object.freeze(this.#modelo);
    }
    isInState = (estado: EstadosComponenteUsuario) => this.#modelo.estado === estado;
    asignarCaracteristicasDelComponente = ( borrable: boolean, editable: boolean ) => this.actualizarModelo({
        borrable: borrable,
        editable: editable
    })

    yaTengoLosDatosDelUsuario = (): boolean => this.#modelo.datosDeUsuario !== undefined;
    puedeSolicitarseBorrado =   (): boolean => this.#modelo.estado === EstadosComponenteUsuario.NORMAL && this.#modelo.borrable;
    puedeAceptarBorrado =       (): boolean => this.#modelo.estado === EstadosComponenteUsuario.EN_BORRADO;
    puedeCancelarseBorrado =    (): boolean => this.#modelo.estado === EstadosComponenteUsuario.EN_BORRADO;

    puedeSolicitarseEdicion =   (): boolean => this.#modelo.estado === EstadosComponenteUsuario.NORMAL && this.#modelo.editable;
    puedeAceptarEdicion =       (): boolean => this.#modelo.estado === EstadosComponenteUsuario.EN_EDICION;
    puedeCancelarseEdicion =    (): boolean => this.#modelo.estado === EstadosComponenteUsuario.EN_EDICION;

    puedeCargado =              (): boolean => this.#modelo.estado === EstadosComponenteUsuario.CARGANDO;
    puedeIrAError =             (): boolean => this.#modelo.estado === EstadosComponenteUsuario.CARGANDO;

    iniciarBorrado =    (): UsuarioComponentModel => this.#cambiarEstado(EstadosComponenteUsuario.EN_BORRADO, this.puedeSolicitarseBorrado);
    aceptarBorrado =    (): UsuarioComponentModel => this.#cambiarEstado(EstadosComponenteUsuario.NORMAL,     this.puedeAceptarBorrado);
    cancelarBorrado =   (): UsuarioComponentModel => this.#cambiarEstado(EstadosComponenteUsuario.NORMAL,     this.puedeCancelarseBorrado);

    iniciarEdicion =    (): UsuarioComponentModel => this.#cambiarEstado(EstadosComponenteUsuario.EN_EDICION, this.puedeSolicitarseEdicion);
    aceptarEdicion =    (): UsuarioComponentModel => this.#cambiarEstado(EstadosComponenteUsuario.NORMAL,     this.puedeAceptarEdicion);
    cancelarEdicion =   (): UsuarioComponentModel => this.#cambiarEstado(EstadosComponenteUsuario.NORMAL,     this.puedeCancelarseEdicion);

    cargaFinalizada =   (datosUsuario: DatosDeUsuario): UsuarioComponentModel =>{
        this.actualizarModelo({datosDeUsuario: datosUsuario});
        return this.#cambiarEstado(EstadosComponenteUsuario.NORMAL,     this.puedeCargado)
    };
    irAError =          (error: Error): UsuarioComponentModel => {
        this.actualizarModelo({error: error});
        return this.#cambiarEstado(EstadosComponenteUsuario.ERROR,      this.puedeIrAError);
    }

    #cambiarEstado = (nuevoEstado: EstadosComponenteUsuario, validacion:()=>boolean) => {
        // Valido si el cambio de #estado es posible, con la función que me suministren
        if( !validacion() ) {
            throw new Error('No se puede cambiar el #estado dado el #estado del componente');
        }
        return this.actualizarModelo({estado: nuevoEstado});
    }
}