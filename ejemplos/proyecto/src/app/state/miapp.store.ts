import { StoreModule } from "@ngrx/store";
import { textosReducer } from "./texto/texto.reducer";

export const MiAppStore = StoreModule.forRoot({
    texto: textosReducer,
    // usuario: usuariosReducer
    // login: loginReducer
});