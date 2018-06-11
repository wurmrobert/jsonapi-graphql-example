export class ObjectHelper {

    /**
     * Removes all keys value pairs from object with given keys recursive
     * @param key of property which should get deleted
     * @param obj object with key
     */
    public static removeKeysFromObjectRecursive(key, obj) {
        if(!obj) return;

        for(let prop in obj) {
            if (prop === key) {
                delete obj[prop];
            } else if (typeof obj[prop] === 'object') {
                this.removeKeysFromObjectRecursive(key, obj[prop]);
            }
        }
    }
}
