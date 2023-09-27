import { DatosModificablesDeUsuario } from './usuario.update.model';

export interface DatosDeNuevoUsuario extends DatosModificablesDeUsuario {
    nombre: string;
    apellido: string;
    edad: number;
    foto: string;
}