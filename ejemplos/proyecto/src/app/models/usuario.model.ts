import { DatosModificablesDeUsuario } from './usuario.update.model';

export interface DatosDeUsuario extends DatosModificablesDeUsuario {
    nombre: string;
    apellido: string;
    edad: number;
    foto: string;
    id: number;
}