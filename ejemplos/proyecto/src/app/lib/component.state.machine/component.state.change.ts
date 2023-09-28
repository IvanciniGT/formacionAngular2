import { ComponentState } from "src/app/lib/component.state.machine/component.state";
import { ComponentModel } from "src/app/lib/component.state.machine/component.model";



export class ComponentStateChange<T extends ComponentModel, M extends Partial<T>> {
    private constructor(public readonly initialState: ComponentState,
        public readonly finalState: ComponentState,
        private readonly validation: (compoentModel: T) => boolean = () => true) { }

    execute(componentModel: T, newData: M): T {
        if (componentModel.state !== this.initialState) {
            throw new Error(`Cannot change state from ${componentModel.state.name} to ${this.finalState.name}. Current state should be ${this.initialState.name}`);
        }
        if (!this.validation(componentModel)) {
            throw new Error(`Cannot change state from ${componentModel.state.name} to ${this.finalState.name}. Validation failed.`);
        }
        return { ...componentModel, ...newData, state: this.finalState };
    }
    canBeExecuted(componentModel: T): boolean {
        if (componentModel.state !== this.initialState) {
            return false
        }
        return this.validation(componentModel);
    }
    static create<T extends ComponentModel, M extends Partial<T>>(
        initialState: ComponentState,
        finalState: ComponentState,
        validation?: (ComponentModel: T) => boolean): ComponentStateChange<T, M> {
        return new ComponentStateChange(initialState, finalState, validation);
    }
}
