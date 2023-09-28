import { Observable } from "rxjs";
import { DatosDeUsuario } from "src/app/models/usuario.model";
import { DatosModificablesDeUsuario } from "src/app/models/usuario.update.model";

export abstract class UsuarioService {

  abstract editarUsuario(id: number, nuevosDatos: DatosModificablesDeUsuario): Observable<DatosDeUsuario>;

  abstract getUsuario(id: number): Observable<DatosDeUsuario | undefined>;

  abstract getUsuarios(): Observable<DatosDeUsuario[]>;

  abstract nuevoUsuario(datos: DatosModificablesDeUsuario): Observable<DatosDeUsuario>;

  abstract borrarUsuario(id: number): Observable<DatosDeUsuario | undefined>;

}
// MOCK: 1º Necesita stubear todas las funciones... con distintos datos de entrada y salida
//       2º Necesito meterla la lógica de comprobación en cada caso

// FAKE 