
LISTADO DE USUARIOS
@Input usuariosEditables
@Input usuariosBorrables
datosUsuarios?: Array<DatosDeUsuario>
datosSeleccionados?: Array<DatosDeUsuario>
usuariosAMostrar?: Array<DatosDeUsuario>

formulario para el filtro (Reactivos, Tradicionales,... Identificador)
    filtroActual: string
state: number


> Peticion al servicio: getUsuarios()


    FILTRO [          ] BUSCAR (o auto)
        por todos los campos del usuario (nombre, apellidos, email)
    
    Si usuariosBorrables entonces:
    [SeleccionarTodos] [DeseleccionarTodos] [Borrar (los seleccionados)] 

    > Datos usuario 1
    > Datos usuario 2
    > Datos usuario 3

Las comunicaciones entre el listado y los usuarios las realizamos a través de eventos.
    En un rato, cuando esté funcionando, las meteremos con REDUX.

## ESTADOS DEL COMPONENTE

```mermaid
stateDiagram-v2
        [*] --> CARGANDO_DATOS
        CARGANDO_DATOS --> ERROR_EN_CARGA
        CARGANDO_DATOS --> DATOS_CARGADOS
        DATOS_CARGADOS --> ALGUNO_SELECCIONADO
        ALGUNO_SELECCIONADO --> DATOS_CARGADOS
        DATOS_CARGADOS --> TODOS_SELECCIONADOS
        ALGUNO_SELECCIONADO --> TODOS_SELECCIONADOS
        TODOS_SELECCIONADOS --> DATOS_CARGADOS

```

