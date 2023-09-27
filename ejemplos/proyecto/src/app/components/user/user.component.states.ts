export enum EstadosComponenteUsuario {
    NORMAL = 0,
    EN_EDICION = 1,
    EN_BORRADO = 2,
    CARGANDO = 3,
    ERROR = 4,
    INICIO = -1
}

export enum CambiosDeEstadoComponenteUsuario {
    INICIAR_BORRADO = 0,//validacion // Estado final
    ACEPTAR_BORRADO = 1,
    CANCELAR_BORRADO = 2,
    INICIAR_EDICION = 3,
    ACEPTAR_EDICION = 4,
    CANCELAR_EDICION = 5,
    CARGA_FINALIZADA = 6,
    IR_A_ERROR = 7
}