

export class ComponentState {
    private constructor(public readonly name: string) { }

    static create(name: string): ComponentState {
        return new ComponentState(name);
    }
}
