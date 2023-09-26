import { EstadosComponenteUsuario } from './user.component.states';
/*
                +-Cancelar------------+
                |                     |
                +--Aceptar------------+
                v                     |
                Normal -?borrable-> EnBorrado
                ^    -?editable-> EnEdicion
                |                     |
                +-Cancelar------------+
                |                     |
                +--Aceptar-?dirty-----+ (Si ha habido cambio en los datos)
*/

// Posibles estados (ACCESIBLES DESDE FUERA)


export class UsuarioState {
    
    private estado: EstadosComponenteUsuario;
    private borrable: boolean = false;  
    private editable: boolean = false;

    constructor( borrable: boolean, editable: boolean ){
        this.estado = EstadosComponenteUsuario.NORMAL;
        this.asignarCaracteristicasDelComponente( borrable, editable );
    }

    asignarCaracteristicasDelComponente = ( borrable: boolean, editable: boolean ) => {
        this.borrable = borrable;
        this.editable = editable;
    }

    puedeSolicitarseBorrado =   (): boolean => this.estado === EstadosComponenteUsuario.NORMAL && this.borrable;
    puedeAceptarBorrado =       (): boolean => this.estado === EstadosComponenteUsuario.EN_BORRADO;
    puedeCancelarseBorrado =    (): boolean => this.estado === EstadosComponenteUsuario.EN_BORRADO;

    puedeSolicitarseEdicion =   (): boolean => this.estado === EstadosComponenteUsuario.NORMAL && this.editable;
    puedeAceptarEdicion =       (): boolean => this.estado === EstadosComponenteUsuario.EN_EDICION;
    puedeCancelarseEdicion =    (): boolean => this.estado === EstadosComponenteUsuario.EN_EDICION;
    
    iniciarBorrado =    (): void => this.cambiarEstado(EstadosComponenteUsuario.EN_BORRADO, this.puedeSolicitarseBorrado);
    aceptarBorrado =    (): void => this.cambiarEstado(EstadosComponenteUsuario.NORMAL, this.puedeAceptarBorrado);
    cancelarBorrado =   (): void => this.cambiarEstado(EstadosComponenteUsuario.NORMAL, this.puedeCancelarseBorrado);

    iniciarEdicion =    (): void => this.cambiarEstado(EstadosComponenteUsuario.EN_EDICION, this.puedeSolicitarseEdicion);
    aceptarEdicion =    (): void => this.cambiarEstado(EstadosComponenteUsuario.NORMAL, this.puedeAceptarEdicion);
    cancelarEdicion =   (): void => this.cambiarEstado(EstadosComponenteUsuario.NORMAL, this.puedeCancelarseEdicion);

    private cambiarEstado(nuevoEstado: EstadosComponenteUsuario, validacion:()=>boolean){
        // Valido si el cambio de estado es posible, con la funcion que me suministren
        if( validacion() ) {
            // Si es posible cambio el estado
            this.estado = nuevoEstado;
        }else{
            // Si no es posible OSTION PADRE !
            throw new Error('No se puede cambiar el estado dado el estado del componente');
        }

    }
}