import { StoreModule } from "@ngrx/store";
import { textosReducer } from "./texto/texto.reducer";
import { usuariosReducer } from "./usuarios/usuarios.reducer";

export const MiAppStore = StoreModule.forRoot({
    texto: textosReducer,
    usuarios: usuariosReducer
    // login: loginReducer
});