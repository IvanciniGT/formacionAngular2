import { DatosDeUsuario } from "src/app/models/usuario.model";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

export interface UsuarioPendingOperation {
    type: 'edit' | 'delete';
    user: DatosDeUsuario
    component: string ;
}

export interface DataService {
    nuevaOperacionPendiente(operacion: UsuarioPendingOperation): void;
    operacionPendienteFinalizada(operacion: UsuarioPendingOperation): void;
    getObservable(): Observable<UsuarioPendingOperation|undefined>;
}

@Injectable(
    { providedIn: 'root' }
)
export class DataService implements DataService {
    private operacionPendienteSubject = new BehaviorSubject<UsuarioPendingOperation|undefined>(undefined);

    nuevaOperacionPendiente(operacion: UsuarioPendingOperation): void {
        this.operacionPendienteSubject.next(operacion);
    }

    operacionPendienteFinalizada(operacion: UsuarioPendingOperation): void {
        // Habría que asegurar que es la misma que me piden cancelar
        // Si no dar un aviso. Hay algún bug
        this.operacionPendienteSubject.next(undefined);
    }

    getObservable(): Observable<UsuarioPendingOperation|undefined> {
        return this.operacionPendienteSubject.asObservable();
    }
}

// Para esto, esta guay!
// [ React vs Angular ] vs Vue

// React: JS ... más libertad
//      En React puedo usar RXjs, lo que les daría total libertad
//      ... pero no es lo normal... usan mucho Redux > Que impone una forma de trabajo muy estricta
// Angular: Estructura que te obliga a seguir / TS 
//      En Angular podemos usar REDUX... pero no es lo normal
//      ... usan mucho RXjs > Que me total librertad (Que no me impone ninguna forma de trabajo)
