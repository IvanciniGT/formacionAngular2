import { Observable, of, throwError } from "rxjs";
import { DatosDeUsuario } from "src/app/models/usuario.model";
import { DatosModificablesDeUsuario } from "src/app/models/usuario.update.model";
import { UsuarioService } from "../user.service";
import { DatosDeNuevoUsuario } from "src/app/models/usuario.nuevo.model";
import { Injectable } from "@angular/core";

// Que Angular sepa que es un servicio, y que se puede inyectar en otros servicios o componentes
@Injectable({
  providedIn: 'root'
})
export class UsuarioFakeService implements UsuarioService {

  private usuarios: Array<DatosDeUsuario> ;

  constructor() {
    this.usuarios = [
      this.crearUsuario('Pepe', 'Pérez',22, 'https://picsum.photos/200', 'pepe@pepe', '666666666'),
      this.crearUsuario('Juan', 'García', 22, 'https://picsum.photos/200', 'juan@juan'),
      this.crearUsuario('Ana', 'Pérez',22, 'https://picsum.photos/200', 'ana@ana', '666666666'),
      this.crearUsuario('María', 'García', 22, 'https://picsum.photos/200', 'maria@maria'),
    ]
  }

  editarUsuario(id: number, nuevosDatos: DatosModificablesDeUsuario): Observable<DatosDeUsuario> {
    let usuarioAEditar = this.usuarios.find(usuario => usuario.id === id);
    if(!usuarioAEditar){
      return throwError(()=> "Usuario no encontrado not implemented.");
    }
    let usuarioEditado = {...usuarioAEditar!, ...nuevosDatos};
    this.usuarios = this.usuarios.map(usuario => usuario.id === id ? usuarioEditado : usuario);
    return of(usuarioEditado);
  }
  getUsuario(id: number): Observable<DatosDeUsuario | undefined> {
    return of(this.usuarios.find(usuario => usuario.id === id));
  }
  getUsuarios(): Observable<DatosDeUsuario[]> {
    return of(this.usuarios);
  }
  nuevoUsuario(datos: DatosDeNuevoUsuario): Observable<DatosDeUsuario> {
    let nuevoUsuario = this.crearUsuario(datos.nombre, datos.apellido, datos.edad, datos.foto, datos.email, datos.telefono)
    this.usuarios.push(nuevoUsuario);
    return of(nuevoUsuario);
  }
  borrarUsuario(id: number): Observable<DatosDeUsuario | undefined> {
    let usuarioABorrar = this.usuarios.find(usuario => usuario.id === id);
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    return of(usuarioABorrar);
  }

  private nextid:number = 0;
  private crearUsuario(nombre: string, apellido: string, edad: number, foto: string, email: string, telefono?: string): DatosDeUsuario {
    this.nextid++;
    return {
      id: this.nextid,
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      edad: edad,
      foto: foto
    }
  }

}