import { ComponentStateChange } from "./component.state.change";
import { ComponentModel } from "./component.model";
import { ComponentState } from "./component.state";
import { ComponentProperties } from "./component.properties";


export class ComponentStateMachine<P extends ComponentProperties, T extends ComponentModel & P> {

    private componentModel: T;

    constructor(initialData: T) {
        this.componentModel = initialData;
        console.log("State Initialized", this.componentModel.state, this.componentModel)
    }

    get data(): T {
        return Object.freeze(this.componentModel);
    }

    updateProperties<P>(newData: P): T {
        this.componentModel = { ...this.componentModel, ...newData };
        console.log("newProperties", this.componentModel)
        return this.data;
    }

    getCurrentState(): ComponentState {
        return this.componentModel.state;
    }

    isInState(state: ComponentState): boolean {
        return this.componentModel.state === state;
    }

    canChangeState<M extends Partial<T>>(change: ComponentStateChange<T, M>): boolean {
        return change.canBeExecuted(this.componentModel);
    }

    changeState<M extends Partial<T>>(change: ComponentStateChange<T, M>, newData: M): T {
        this.componentModel = change.execute(this.componentModel, newData);
        console.log("New State", this.componentModel.state, this.componentModel)
        return this.data;
    }

}
