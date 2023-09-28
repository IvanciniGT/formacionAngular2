import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { DatosDeUsuario } from "src/app/models/usuario.model";
import { DatosModificablesDeUsuario } from "src/app/models/usuario.update.model";
import { UsuarioService } from "../user.service";
import { DatosDeUsuarioBackend } from "../models/user.backend.model";
import { convertirBackendEnFrontend } from "../mappers/user.backend.mappper";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceImpl implements UsuarioService {

  readonly BASE_URL = `${environment.apiUrl}/users`;

  constructor(private clienteHttp: HttpClient) {
  }

  getUsuarios(): Observable<DatosDeUsuario[]>{
    return this.clienteHttp.get<DatosDeUsuarioBackend[]>( this.BASE_URL )
        //.pipe( map( datos => datos.map( dato => this.convertirBackendEnFrontend(dato) )) );
        .pipe( map( datos => datos.map( convertirBackendEnFrontend )) )
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

  getUsuario(id: number): Observable<DatosDeUsuario | undefined>{
    return this.clienteHttp.get<DatosDeUsuarioBackend>( `${this.BASE_URL}/${id}` )
        .pipe( map( convertirBackendEnFrontend ) )
        .pipe( catchError( error => {
            console.log('Error en la petición de usuario', error);
            return throwError( () => error );
        } ) );
  }

  editarUsuario(id: number, nuevosDatos: DatosModificablesDeUsuario): Observable<DatosDeUsuario>{
    return this.clienteHttp.post<DatosDeUsuarioBackend>( `${this.BASE_URL}/${id}`, nuevosDatos )
        .pipe( map( convertirBackendEnFrontend ) )
        .pipe( catchError( error => {
            console.log('Error en la actualización de usuario', error);
            return throwError( () => error );
        } ) );
  }


  borrarUsuario(id: number): Observable<DatosDeUsuario | undefined> {
    return this.clienteHttp.delete<DatosDeUsuarioBackend>( `${this.BASE_URL}/${id}` )
        .pipe( map( convertirBackendEnFrontend ) )
        .pipe( catchError( error => {
            console.log('Error en el borrado de usuario', error);
            return throwError( () => error );
        } ) );
  }

  nuevoUsuario(datos: DatosModificablesDeUsuario): Observable<DatosDeUsuario> {
    return this.clienteHttp.put<DatosDeUsuarioBackend>( `${this.BASE_URL}`, datos )
        .pipe( map( convertirBackendEnFrontend ) )
        .pipe( catchError( error => {
            console.log('Error en la creación de usuario', error);
            return throwError( () => error );
        } ) );
  }   
}

