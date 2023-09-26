import { Observable } from "rxjs";
import { DatosDeUsuario } from "src/app/models/usuario.model";

export interface UsuarioService {

  getUsuario(id: number): Observable<DatosDeUsuario>;

}
