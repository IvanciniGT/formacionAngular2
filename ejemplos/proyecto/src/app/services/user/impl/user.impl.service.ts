import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { DatosDeUsuario } from "src/app/models/usuario.model";
import { DatosModificablesDeUsuario } from "src/app/models/usuario.update.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceImpl implements UsuarioService {

  readonly BASE_URL = 'http://localhost:3000/usuarios';

  constructor(private clienteHttp: HttpClient) {
  }

  getUsuarios(): Observable<DatosDeUsuario[]>{
    return this.clienteHttp.get<DatosDeUsuarioBackend[]>( this.BASE_URL )
        //.pipe( map( datos => datos.map( dato => this.convertirBackendEnFrontend(dato) )) );
        .pipe( map( datos => datos.map( this.convertirBackendEnFrontend )) )
        //.pipe( map( datos => datos.map( this.convertirBackendEnFrontend.bind(this) )) );
          // En este caso esto es suficiente... 
          // Funcionará siempre y cuando en la función destino no se me haya ocurrido usar la palabrita mágica: this
          // Al pasar una función, pierde la referencia del scope... pierde el this.
          // Al definir una lambda se queda la referencia del this
        .pipe( catchError( error => {
            console.log('Error en la petición de usuarios', error);
            return throwError( () => error );
        } ) );
  }

  /*
    {
      "name": "Pepe",
      "surname": "Pérez",
      "age": 22,
      "photo": "https://picsum.photos/200",
      "email": "pepe@pepe",
      "phone": "666666666"
    }
  */

    convertirBackendEnFrontend(datos: DatosDeUsuarioBackend): DatosDeUsuario {
      return {
        id: datos.id,
        nombre: datos.name,
        apellido: datos.surname,
        edad: datos.age,
        foto: datos.photo,
        email: datos.email,
        telefono: datos.phone
      }
    }
}

export interface DatosDeUsuarioBackend {
  name: string;
  surname: string;
  age: number;
  photo: string;
  email: string;
  phone?: string;
  id: number
}