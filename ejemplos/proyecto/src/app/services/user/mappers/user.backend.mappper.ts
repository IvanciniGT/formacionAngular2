import { DatosDeUsuario } from "src/app/models/usuario.model";
import { DatosDeUsuarioBackend } from "../models/user.backend.model";

export function convertirBackendEnFrontend(datos: DatosDeUsuarioBackend): DatosDeUsuario {
  return {
    id: datos.id,
    nombre: datos.name,
    apellido: datos.surname,
    edad: datos.age,
    foto: datos.photo,
    email: datos.email,
    telefono: datos.phone
  };
}
