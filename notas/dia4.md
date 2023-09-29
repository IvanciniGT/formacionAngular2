# JAVA y JAVASCRIPT

Son 2 lenguajes que hacen un uso desastroso de la memoria RAM. Hacen un destrozo
Esto es bueno o malo? Ni bueno ni malo. Es un feature del lenguaje

Se diseñaron así intencionalmente.

Cuanta pasta me cuesta tener a un programador afinando punteros.. limpiando memory leaks el codigo
    50h x 50€/h = 2500
Cuanta pasta me ahorro teniendo un lenguaje que lo hace por mi
    Cuanto me cuesta una pastilla de memoria para una máquina: 300€

    JAVA va mas lento
    JAVA necesita más RAM

    Y esto mismo a JS

---

App                                             ESTADO GLOBAL .... pero PARCELADO {
                                                                                       errores: {}
                                                                                       login: {
                                                                                            userId:
                                                                                            email:
                                                                                            language:
                                                                                            theme:
                                                                                       }
                                                                                       usuarios: {

                                                                                       }
                                                                                  }

    app-header
        <usuario id="17"/>              --->
    app-main
        <app-expediente id="17>
            <app-revisores>
                <listado-usuario/>      --->
            <app-aprobadores>
                <listado-usuario/>      --->

REDUX


Primero, el estado global es inmutable. No podemos modificarlo... lo cambiamos por otro
Cada vez que hay un cambio en el estado global, REDUX avisará a todos aquellos componentes que se hayan suscrito al estado global /carpeta

Por otro lado, cómo se modifica ese estado global... no se toca directamente.
REDUX nos obliga a definir 2 cosas:
    ACCIONES, que puedo pedir a redux que despache
        IDENTIFICACION DE ESA ACCION, Datos
            nuevoUsuarioEnEdicion,   usuario:DatosUsuario
            canceloUsuarioEnEdicion, usuario:DatosUsuario

    Esas acciones son procesadas por REDUCTORES: Reducers
        Un reducer es una función... que se ejecuta en PIPE con otros REDUCERS
        Básicamente redux, cuando se solicita el despacho de una accion,
        manda todos los reductores la accion... uno detras de otro.
        Cada reductor recibe la salida del anterior (estado global modificado... o no)
        Y debe devolver lo mismo (estado global modificado... o no)
        El reductor mira si la accion que se ha solicitado despachar es suya...
        Si lo es... modifica el estado global... De hecho no lo modifica... CREA UN NUEVO ESTADO GLOBAL


redux.despacha(nuevoUsuarioEnEdicion,usuario1)
                v
                v         ESTADO GLOBAL {errores:{}, login:{}, usuarios:{}}
                v          v
                erroresReducer          Mira a ver si la acción es para él... que lo es, modifica el estado y lo devuelve
                    v                  Que no... devuelve el estado tal y como estaba
                loginReducer
                    v
                usuariosReducer
                    v
                NUEVO ESTADO GLOBAL
                    Si es diferente del que había, se notifica a todos los componentes que se hayan subscrito al ESTADO GLOBAL


usuariosReducer:
    Accion nuevoUsuarioEnEdicion
    Accion nuevoUsuarioEnBorrado
    Accion yaNoHayNadieNiEnEdicionNiBorrado

Las acciones pueden ser despachadas por diferentes componentes:

    app-header
        <usuario id="17"/>              --->
    app-main
        <app-expediente id="17>        --->                     Todos estos despachan acciones
            <app-revisores>                                     del tipo que procesa el usuariosReducer
                <listado-usuario/>      --->
            <app-aprobadores>
                <listado-usuario/>      --->

    En nuestro caso, estos mismos componentes los suscribimos al ESTADO GLOBAL, para que se enteren cuando otro haya cambiado algo

ESTO ES REDUX. Y lo podemos usar desde Angular, REACT, Vue.... JS pelao....

Ahora bien... para Angular hay una librería que lo integra de forma un poco más sencilla


---
Utilizar un servicio rxjs

@Injectable()
export class DataServiceImpl implements DataService {
    
}
