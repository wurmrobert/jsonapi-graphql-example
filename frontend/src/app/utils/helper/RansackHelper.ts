export class RansackHelper {

    /**
     * Converts Devexpress filter to Ransak notation
     * @param condition devexpress filter condition which should get convertet
     */
    public static convertDevexpressFilterConditionToRansak(condition: DevexpressFilter): string {
        switch (condition) {
            case '=':
                return 'eq'
            case '<>':
                return 'not_eq'
            case '<':
                return 'lt'
            case '<=':
                return 'lteq'
            case '>':
                return 'gt'
            case '>=':
                return 'gteq'
            case 'contains':
                return 'cont'
            case 'notcontains':
                return 'not_cont'
            case 'startswith':
                return 'start'
            case 'endswith':
                return 'end'
            default:
                return condition;
        }
    }
}

export type DevexpressFilter = 
    '=' | '<>' | '<' | '<=' | '>' | '>=' | 'contains' | 'notcontains'
    | 'startswith' | 'endswith' | 'null'
;
