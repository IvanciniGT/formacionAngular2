import { ComponentState } from "src/app/lib/component.state.machine/component.state";

// Son las propiedades que van asociadas a los cambios de estado (y deben ser suministradas en ese momento)
export interface ComponentModel{
    state: ComponentState;
}
