
# Angular

Un framework para el desarrollo de apps que van a correr sobre un motor de procesamiento de JS.
Con qué lenguaje trabajamos en Angular: Principalmente TS.
Necesito Node para ejecutar una app Angular? NO
Lo que pasa es que tenemos algunas utilidades empaquetadas en una aplicación que nos ofrece la gente de Google (ng)
Y esas utilidades están escritas en JS... y necesitan correr fuera de un navegador.
Por debajo está usando npm/yarn.

Angular viene con muchas librerías.

Al igual que Spring en JAVA es un Framework de inversión de control

## Inversión de control:

Esto tiene que ver precisamente con el uso de lenguaje DECLARATIVO:
Yo ya no digo lo que hay que hacer (FLUJO DE MI APP)
Se lo dejo al framework.
En el caso de Angular la solicitamos aquí: 
    main.ts
        platformBrowserDynamic().bootstrapModule(AppModule); // Inversión de control

    ### Imaginad que quiero montar una ETL (Extract-Transform-Load)
        Un proceso batch que ejecuta todas las noches para:
            - Leer datos de usuarios de un fichero CSV
            - Validarlos, tranformarlos y enriquecerlos
            - Cargarlos en una BBDD Mongo
        Una cosa es el programa... y otra un orquestador que configure para ejecutar el programa cuando se dispare un evento (HORA)

    #### Usando una sintaxis tradicional. Aquí defino el FLUJO de mi app (script)

        PASO 0: Mandar el correo de inicio
        PASO 1: Abrir el fichero
        PASO 2: Para cada linea / o bloque de lineas -> BUCLE (For, While)
            PASO 2.1: Validar
                    If(!email.contains("@")): OSTION (Exception)
            PASO 2.2: Transformar
            PASO 2.3: Enriquecer
        PASO 3: Cargarlo en el Mongo
        PASO 4: Mandar el correo de finalización
    
    #### Usando una sintaxis declarativa
        - Ah... Y mandas un correo después de todo
        - Oye... necesito que se lean datos de un CSV
        - Ah... y antes de empezar Manda un correo
        - Y cuando acabes los dejas en el mongo
        - Ah... y valida los datos... y los filtras y los enriqueces

          FEDERICO !!  Te has enterao? Pues ale... a currar! // Inversión de control

## Framework vs librería?

Un framework trae muchas librerías + herramientas + metodología (arquitectura)

React? Librería

## Origen de estos frameworks

- SPA: Single page application
    Esto antes también lo podíamos hacer... pero ... agárrate a la silla: AJAX
    Quiero poder montarlas de una forma más sencilla
    Quiero poder reutilizar componentes WEB -> W3C (web components)
        Hoy en día todo navegador de forma nativa permite trabajar con web components -> exportan (exponen) esa funcionalidad mediante un API JS... Esto mato al resto de lenguajes en frontal web (php, jsp...)
- PWA: Progresive Web application
    Que una aplicación web que desarrollo se pueda "instalar" dentro de un dispositivo (en la pantalla de inicio, menu de apps del dispositivo)
    Y que pueda ejecutarla sin conexión a red: Service Worker
        Service Worker: Es un programa que puedo instalar y ejecutar paralelamente al código de mi aplicación en un dispositivo.

            DOM app que renderizo en un browser <- JS (datos) <>  SW        <> Backend
                                                                  |
                                                                  v
                                                            Almacenamiento

## Para qué?

- Aprovechar mucha funcionalidad que nos ofrece:
  - Routing
- Seguir una determinada estructura / normas de desarrollo: metodología
- Nos ayuda a seguir unas buenas prácticas de desarrollo: SOLID

### SOLID ( tio bob )

5 Principios que debo tener en la cabeza de cara a escribir un programa... para conseguir un programa fácil de entender(mantener, evolucionar).
- Inversión de dependencias (D)
- Inyección de dependencias

## npm/yarn

NO SON GESTORES DE PAQUETES. No son gestores de dependencias. Eso es una visión muy pobre de lo que son estas herramientas.
Son herramientas de automatización, que me permiten automatizar tareas habituales del proyecto:
- transpilación
- empaquetado
- ejecución de pruebas
- Creación de un entorno de desarrollo
- Generación de un boilerplate
- Gestión de dependencias

package.json:
- tareas que automatizo: scripts
- dependencias

## Maven/gradle/sbt

## Msbuild, dotnet, nuget

# JS

Un LENGUAJE de programación, que permite montar todo tipo de apps... pero siempre ha sido así? Al principio no.
Mocha (Netscape).
Al principio, la idea de JS era poder escribir pequeños programas (Scrips) que corrían dentro de un navegador.
Ese lenguaje fué evolucionando... cada navegador hacía su propia implementación de un motor de procesamiento de JS.

En un momento dado, ocurre algo: La gente de google, extrae el motor de JS que desarrollaban para el navegador Chromium y lo convierte en un proyecto independiente. De forma que pueda interpretarse código JS fuera de un navegador: NODE

## Lenguaje compilado / interpretado

JS: Interpretado (como python, php)
Compilados: (.net, C, C#, c++, Objective-c)

JAVA: Compilado + Interpretado
    .java -> compilación -> .class  -> interpretado JVM (oracle, amazon correto, temurin, openjdk). Esa JVM sigue un estandar.
                            byte-code

Un programa JS corre sobre un intérprete (motor de procesamiento de JS).
Antiguamente cada navegador tenía su propio motor de procesamiento JS -> CAOS

En un momento dado, el lenguaje JS se somete a un estandar, que la industria acepta: ECMAScript

A día de hoy, seguimos teniendo varios motores de JS (intérpretes) o no? Claro... montones, pero que siguen el estandar.

## Lenguajes de tipado estático / tipado dinámico

- Tipado dinámico (js, python): 
    Las variables no tienen tipo de datos
- Tipado estático (JAVA, TS): 
    Las variables si tiene un tipo preasignado

```js
var texto = "hola" // Statement: Sentencia, Enunciado, Oración, Frase
// "hola"       Crea un objeto de tipo "String" y lo pone en RAM
// var texto    Me defino una variable con nombre texto
// =            Asignación: Asigna la variable "texto" al objeto de tipo String "hola" que tengo en memoria
```

## En base a los paradigmas de programación que usan:

Son formas en las que un lenguaje permite expresarnos.

### Lenguaje imperativo

Es la forma más tradicional. Damos instrucciones que se deben ejecutar secuencialmente... A veces necesitamos romper esa secuencialidad: IF, SWITCH, FOR, WHILE

### Lenguaje procedural

Cuando el lenguaje me permite definir mis propias funciones e invocarlas posteriormente.
Esto es guay: Me permite estructurar mejor los programas y además reutilizar código

### Lenguaje funcional

Cuando el lenguaje me permite que una variable referencia a una función
Y posteriormente ejecutar la función desde la variable.

El asunto es la transcendencia de esto. Desde el momento que puedo hacer lo de ahñi arriba, puedo:
- Definir funciones que acepten funciones como argumentos
- Definir funciones que devuelvan funciones como resultado

### Lenguaje orientado a objetos

Nos permite definir nuestros propios TIPOS de variables, con sus propiedades y funciones.

Todo lenguaje permite trabajar de serie con unos ciertos TIPOS de datos:

                Propiedades que lo caracterizan     funciones
    String      secuencia de caracteres             .upper() .lower()
    List        secuencia de valores                .length() .get()
    Date        dia/mes/año                         .caeEnFinDeSemana()
    Usuario     nombre/apellidos/email              .eresMayorDeEdad()

+ herencia, polimorfismo, sobrecarga, sobreescritura...

### Paradigma declarativo

Haciendo uso de este paradigma, me centro en lo que quiero conseguir... no en cómo conseguirlo

... Los paradigmas también los tenemos en Español, Chino, Húngaro, Catalán

        Espera FEDERICO... IF no hay sillas, vete al IKEA y compra una silla
        FEDERICO, IF hay algo debajo de la ventana, que no sea una silla:
                Lo quitas
        FEDERICO, IF no hay ya una silla debajo de la ventana, FEDE !!! pon una silla debajo de la ventana!               // Imperativa: Da una orden: Dice lo que tiene que hacer
            Error BAD_REQUEST, NOT_FOUND

        FEDERICO, debajo de la ventana quiero una silla!            // Desiderativa

        FEDERICO, debajo de la ventana tiene que haber una silla    // No es imperativo. Es declarativo
            // No me centro en decirla a FEDE lo que debe hacer... sino en lo que yo quiero conseguir: PROPOSITO
            // La responsabilidad de conseguirlo es de FEDERICO !

Adoramos el lenguaje declarativo: Angular, Spring, Ansible, Terraform, Kubernetes, Docker-compose
Cada vez más odiamos el lenguaje imperativo

### Problemas del tipado dinámico

No tengo npi del tipo de dato que estoy manejando, no se que puedo hacer con ella.... vamos probando
Esto es especialmente sangrante al trabajar con funciones/métodos.

```js
function generarInforme(titulo, datos){ // Signatura
    // TODO
}
// Qué le tengo que pasar? npi
// titulo: npi, string (con el título), boolean (si quiero titulo)
// datos? npi
// Qué devuelve la función? npi
// Esto convierte el API en inútil 100%
// Al final, o miro código o miro documentación para saber como hablar con esa función.
```
Si estoy en un proyecto pequeño y lo hago yo solo no es tanto problema.
Pero si el proyecto es más grande o hay varios participantes... no hay manera.

# TS?

Un LENGUAJE de programación, con su propia gramática, independiente de la JS.

    .ts -> transpilación -> .js -> Serán interpretados (navegador, .... otros motores de JS)

## Por qué TS?

1º Lenguaje tipado estático
2º Añade nuevas características al lenguaje: abstract

# Kotlin

Un LENGUAJE de programación, usado principalmente para apps android.

# LENGUAJE de programación

Emojis. Son un lenguaje? Son un alfabeto. Permiten transmitir información (comunicarse), pero no son un lenguaje.
Un lenguaje necesita de una GRAMATICA: sintaxis, morforlogía, semántica.

---

# Sincronía / Asincronía

De qué va esto? Forma en la que realizamos una comunicación
En frontal, que tipo de comunicaciones nos interesan? Asíncrona...
    Para que la aplicación sea más ágil / interactiva

Las comunicaciones síncronas son bloqueantes.
Las comunicaciones asíncronas no son bloqueantes:

```js

// ... hago unas tareas
var FUTURO = llamoAFuncionA(datos, miFuncionDeCallback)
// Y luego sigo haciendo cosas...
// Pero en un momento dado, necesito respuesta de la FuncionA
//    (Si no necesito la respuesta de funcionA para nada: FIRE-AND-FORGET)
// - FUTUROS : Promise (devuelve 1 valor) / Observable (ir devolviendo valores hasta que acabe)
// Cuando el FUTURO sea resuelto: Ejecuta 
//                  Tarea que necesita la respuesta de FuncionA. Estrategias
// - CALLBACK

function miFuncionDeCallback(DATOS_QUE_RECIBE){
    // Tarea que necesita la respuesta de FuncionA. Estrategias
    // Entre los DATOS_QUE_RECIBE... recibirá lo que devuelva A
}
```

# Pruebas de software

Toda prueba, da igual el tipo, se debe centrar en un único aspecto de un sistema.

## Categorías de las pruebas:

- Unitarias                 Se centra en un aspecto de un componente AISLADO del sistema
- Integracion               Se centran en la COMUNICACION entre componentes
- Sistema (end2End)         Se centran en el COMPORTAMIENTO del sistema en su conjunto

Prueba                                              ->     UsuarioComponent   | ->  UsuarioService
                                                                                    UsuarioServiceFake...
                                                                                    que cuando le piden un dato, devuelve siempre "UN DATO PREFIJADO"
    Cuando paso el usuario 17
    a un componente usuario:
    <usuario id="17">

    Entonces quiero que se renderice un HTML con:
    H2: "Datos de: FEDERICO"
    image-> Con la foto del polluelo
    Botones...

El tipo de prueba DEPENDE DE LAS CONDICIONES EN QUE HAGA LA PRUEBA. Puede ser tanto unitaria como de integración
- Sin hacer nada, lo que tengo es una prueba de Integración:
 - Puede fallar porque: 
   - Porque el componente no esté bien por dentro (bugs en el código)
   - Porque el servicio no esté bien por dentro (bugs) o no esté disponible
   - Porque la comunicación entre ambos no sea buena
- Para hacer una prueba unitaria, necesito AISLAR al componente... es decir, en nuestro caso, que trabaje contra un UsuarioService de mentira, que tengo TOTALMENTE CONTROLADO: Los test-doubles (mocks)

Test-Doubles:
    - Stub
    - Fakes
    - Spy
    - Mocks
    - Dummy

## Comunicación entre componentes

SPA: Componentes que necesitará comunicarse.

Mecanismos de comunicación tenemos entre componentes:
- Comunicación padre > hijo : @Input (que el padre pase props a un hijo)
- Comunicación hijo > padre : @Output (eventos)
- A través de un externo (servicio)
    ComponenteA <> Servicio
    ComponenteB <>

- ComponenteA -> Servicio -> ComponenteB
                          Patrón Listener / pub/sub

- Cuando quiero tener comunicaciones globales habilitadas entre componentes REDUX

REDUX es una librería de JS para el control de estado globales de una app.

        ComponenteA         ComponenteB             Servicio
        Se subscribe        acciones                Se subscribe
        al Almacen             v^                   al almacen
                             Reducer
                               v^
                              REDUX
                               v^
                    ALMACEN GLOBAL DE DATOS (Store) {usuario: 45}

# Versiones de software:
v2.1.0
                Cuándo se incrementan:
- MAJOR: 2      Breaking changes (cualquier cambio que rompe retro-compatibilidad):
                Siempre es porque una función del API / o Clase deja de estar disponible
                    altaUsuario(usuario:Usuario) - FUERA
                    altaUsuario(usuario:UsuarioV2) - REEMPLAZO
- MINOR: 1      Nuevas funcionalidades
                Cuando se marca como Deprecated (Obsoleta)... para su eliminación
- PATCH: 0      Arreglos de bugs (fixes)
