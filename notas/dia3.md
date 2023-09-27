
# TestDoubles: Martin Fowler

Para hacer pruebas unitarias necesitamos TestDoubles... y hay muchos tipos de testDoubles:

- Stub
- Fake
- Spy
- Mock
- Dummy

Prueba de Sistema
            UsuarioComponent ---> UsuariosServicio --> Backend
            <usuario id="5">      getUsuario(id)        http://localhost:8080/usuarios/5

Prueba de Integración entre UsuarioComponent ---> UsuariosServicio
            UsuarioComponent ---> UsuariosServicio |--> Backend
            <usuario id="5">      getUsuario(id)        http://localhost:8080/usuarios/5
    Backend de mentirijilla: postman: STUB(o miniFake)          , json-server : FAKE

Prueba Unitaria UsuarioComponent:
            UsuarioComponent ---> |UsuariosServicio --> Backend
            <usuario id="5">      getUsuario(id)        http://localhost:8080/usuarios/5
    UsuariosServicio de mentirijilla

## STUB: Falsea una respuesta (se devuelve siempre una prefijada)
    
    ```javascript
        class UsuariosServicioStub {
            getUsuario(id) {
                return {
                    id: 5,
                    nombre: "Federico",
                    apellido: "Gomez",
                    email: "federico@gomez.es",
                    edad: 35
                }
            }
        }
        ```
## FAKE: Implementa una respuesta (se devuelve una respuesta más elaborada... que tiene en cuenta datos de entrada)
    
    ```javascript
        class UsuariosServicioFake {
            getUsuario(id) {
                if(id < 0)
                    throw new Error("No se puede buscar un usuario con id negativo"
                return {
                    id: id,
                    nombre: "Federico",
                    apellido: "Gomez",
                    email: "federico@gomez.es",
                    edad: 35
                }
            }
        }
        ```
    La gracia de un fake es que lo puedo reutilizar para multiples pruebas
    Un fake llevado al extremo se convierte en: LA IMPLEMENTACION REAL

Prueba unitaria:
    Dado que existe un usuario con el id 5 en el backend
        Que tiene por nombre Federico
        Y por apellido Gomez
        Y por email "federico@gomez.es"
        Y por edad 35
    Cuando se crea un componente usuario con id = 5
    Entonces me pinta los datos del usuario 5 en un HTML
    
Prueba unitaria: √
    Dado que no existe un usuario con el id -5 en el backend
    Cuando se crea un componente usuario con id = -5
    Entonces:
        Se llama al servicio, pasándole el dato -5       <----     usuariosServicioSpy.llamadoConId === -5
        y se pinta un error "El usuario no existe"

    ```javascript
        // Esto ahora no me sirve:
        class UsuariosServicioStub {
            getUsuario(id) {
                // Devuelvo un Observable vacio
            }
        }
        // Spy: es un stub que me permite saber si se ha llamado o no
        class UsuariosServicioSpy {
            llamadoConId?: number;
            getUsuario(id) {
                this.llamadoConId = id;
                // Devuelvo un Observable vacio
            }
        }
        // Spy: es un stub que me permite saber si se ha llamado o no
        class UsuariosServicioMock {
            llamadoConId?: number;
            getUsuario(id) {
                this.llamadoConId = id;
                // Devuelvo un Observable vacio
            }
            verify(){
                if(this.llamadoConId === -5)
                    throw new Error("No se ha llamado al servicio con los datos correctos")
            }
        }


        class ComponenteUsuario { // Esta es la implementación que tengo 
            usuario = null;
            cargarDatos(id){
                // NADA DE CODIGO
                // TODO: Me falta el llamar al servicio
            }
        }
        // Fichero del html
        <div *ngIf="usuario else error;">
            <p>Nombre: {{usuario.nombre}}</p>
            <p>Apellido: {{usuario.apellido}}</p>
            <p>Email: {{usuario.email}}</p>
            <p>Edad: {{usuario.edad}}</p>
        </div>
        <ng-template #error>
            <p>El usuario no existe</p>
        </ng-template>
```

## Prueba Unitaria UsuarioComponent:
            UsuarioComponent ---> |UsuariosServicio --> Backend
            <usuario id="5"> <--- getUsuario(id)        http://localhost:8080/usuarios/5
                                  Un stub y un fake se centran en la respuesta de una comunicación
                                    Stub: Devuelve siempre 33
                                    Fake: Dependeniendo de los parámetros de entrada, devuelve una cosa u otra
                                  Por contra, los spy y los mock se centran en la llamada
                                    Me permiten saber si una llamada se ha realizado o no
                                        El Spy me permite saber si un método ha sido invocado y con qué parámetros
                                        El mock es un concepto más avanzado.
                                            El sabe, tiene lógica para saber si la llamada es correcta o no
                                            Tiene la lógica de comprobación dentro de él

## El dummy es para pruebas, pero no necesariamente unitarias

Prueba unitaria: del componente: 
Componente -> Servicio 1 MOCK/SPY
                login
           -> Servicio 2 MOCK/SPY
                recuperarDatosExpedientes

Prueba de integración entre Componente -> Servicio 2
    Me interesa que la prueba se haga lo más rápida posible y monto un Dummy para el Servicio 1
    Es un objeto que devuelve los valores más sencillos posibles de cada función.
        Servicio1Dummy: {
            login: (id) => true
        }
        Da igual lo que te pasen
        No quiero que valides nada del componente si llamas o no al Servicio1