import { Observable } from "rxjs";
import { DatosDeUsuario } from "src/app/models/usuario.model";
import { DatosModificablesDeUsuario } from "src/app/models/usuario.update.model";

export interface UsuarioService {

  editarUsuario(id: number, nuevosDatos: DatosModificablesDeUsuario): Observable<DatosDeUsuario>;

  getUsuario(id: number): Observable<DatosDeUsuario | undefined>;

  getUsuarios(): Observable<DatosDeUsuario[]>;

  nuevoUsuario(datos: DatosModificablesDeUsuario): Observable<DatosDeUsuario>;

  borrarUsuario(id: number): Observable<DatosDeUsuario | undefined>;

}
// MOCK: 1º Necesita stubear todas las funciones... con distintos datos de entrada y salida
//       2º Necesito meterla la lógica de comprobación en cada caso

// FAKE 