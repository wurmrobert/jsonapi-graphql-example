export class BaseAttribute<T> {
    public key: string;
    public value: T;

    public constructor(key: string, value?: T) {
        this.key = key;
        this.value = value;
    }
}
