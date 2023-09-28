import { DatosDeUsuario } from "src/app/models/usuario.model";
import { ComponentStateChange } from "../../lib/component.state.machine/component.state.change";
import { ComponentState } from "../../lib/component.state.machine/component.state";
import { UsuarioComponentModel } from "./user.component.model";


export const EstadosComponenteUsuario = Object.freeze({
    INICIO: ComponentState.create('INICIO'),
    NORMAL: ComponentState.create('NORMAL'),
    EN_EDICION: ComponentState.create('EN_EDICION'),
    EN_BORRADO: ComponentState.create('EN_BORRADO'),
    REALIZANDO_CARGA_INICIAL: ComponentState.create('REALIZANDO_CARGA_INICIAL'),
    ERROR_EN_CARGA_INICIAL: ComponentState.create('ERROR_EN_CARGA_INICIAL'),
    ALMACENANDO_EDICION: ComponentState.create('ALMACENANDO_EDICION'),
    ERROR_EN_ALMACENAMIENTO_DE_EDICION: ComponentState.create('ERROR_EN_ALMACENAMIENTO_DE_EDICION')
});

export const AccionesComponenteUsuario = Object.freeze({
    INICIAR_CARGA_INICIAL: ComponentStateChange.create<UsuarioComponentModel, { userId: number }>(
        EstadosComponenteUsuario.INICIO, EstadosComponenteUsuario.REALIZANDO_CARGA_INICIAL,
        (componentModel) => componentModel.userData === undefined
    ),
    CARGA_FINALIZADA: ComponentStateChange.create<UsuarioComponentModel, { userData: DatosDeUsuario }>(
        EstadosComponenteUsuario.REALIZANDO_CARGA_INICIAL, EstadosComponenteUsuario.NORMAL
    ),
    CARGA_FALLIDA: ComponentStateChange.create<UsuarioComponentModel, { error: Error }>(
        EstadosComponenteUsuario.REALIZANDO_CARGA_INICIAL, EstadosComponenteUsuario.ERROR_EN_CARGA_INICIAL
    ),
    DATOS_RECIBIDOS_INICIALMENTE: ComponentStateChange.create<UsuarioComponentModel, { userId: number, userData: DatosDeUsuario }>(
        EstadosComponenteUsuario.INICIO, EstadosComponenteUsuario.NORMAL,
        (componentModel) => componentModel.userData !== undefined
    ),
    INICIAR_EDICION: ComponentStateChange.create<UsuarioComponentModel, {}>(
        EstadosComponenteUsuario.NORMAL, EstadosComponenteUsuario.EN_EDICION,
        (componentModel) => componentModel.updatable
    ),
    EDICION_CANCELADA: ComponentStateChange.create<UsuarioComponentModel, {}>(
        EstadosComponenteUsuario.EN_EDICION, EstadosComponenteUsuario.NORMAL
    ),
    EDICION_FINALIZADA: ComponentStateChange.create<UsuarioComponentModel, {}>(
        EstadosComponenteUsuario.EN_EDICION, EstadosComponenteUsuario.ALMACENANDO_EDICION
    ),
    EDICION_ALMACENADA: ComponentStateChange.create<UsuarioComponentModel, { userData: DatosDeUsuario }>(
        EstadosComponenteUsuario.ALMACENANDO_EDICION, EstadosComponenteUsuario.NORMAL
    ),
    ALMACENAMIENTO_FALLIDO: ComponentStateChange.create<UsuarioComponentModel, { error: Error }>(
        EstadosComponenteUsuario.ALMACENANDO_EDICION, EstadosComponenteUsuario.ERROR_EN_ALMACENAMIENTO_DE_EDICION
    ),
    REINTENTAR_ALMACENAMIENTO: ComponentStateChange.create<UsuarioComponentModel, {}>(
        EstadosComponenteUsuario.ERROR_EN_ALMACENAMIENTO_DE_EDICION, EstadosComponenteUsuario.ALMACENANDO_EDICION
    ),
    CANCELAR_ALMACENAMIENTO_DE_EDICION: ComponentStateChange.create<UsuarioComponentModel, {}>(
        EstadosComponenteUsuario.ERROR_EN_ALMACENAMIENTO_DE_EDICION, EstadosComponenteUsuario.NORMAL
    ),
    INICIAR_BORRADO: ComponentStateChange.create<UsuarioComponentModel, {}>(
        EstadosComponenteUsuario.NORMAL, EstadosComponenteUsuario.EN_BORRADO,
        (componentModel) => componentModel.deletable
    ),
    BORRADO_CANCELADO: ComponentStateChange.create<UsuarioComponentModel, {}>(
        EstadosComponenteUsuario.EN_BORRADO, EstadosComponenteUsuario.NORMAL
    ),
    BORRADO_CONFIRMADO: ComponentStateChange.create<UsuarioComponentModel, {}>(
        EstadosComponenteUsuario.EN_BORRADO, EstadosComponenteUsuario.NORMAL
    )
});

