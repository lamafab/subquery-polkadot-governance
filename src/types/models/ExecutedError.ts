// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';



import {
    DispatchError,

    TokenError,

    ArithmeticError,
} from '../enums'


type ExecutedErrorProps = Omit<ExecutedError, NonNullable<FunctionPropertyNames<ExecutedError>>>;

export class ExecutedError implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public type?: DispatchError;

    public moduleId?: string;

    public token?: TokenError;

    public arithmetic?: ArithmeticError;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ExecutedError entity without an ID");
        await store.set('ExecutedError', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ExecutedError entity without an ID");
        await store.remove('ExecutedError', id.toString());
    }

    static async get(id:string): Promise<ExecutedError | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ExecutedError entity without an ID");
        const record = await store.get('ExecutedError', id.toString());
        if (record){
            return ExecutedError.create(record as ExecutedErrorProps);
        }else{
            return;
        }
    }


    static async getByModuleId(moduleId: string): Promise<ExecutedError[] | undefined>{
      
      const records = await store.getByField('ExecutedError', 'moduleId', moduleId);
      return records.map(record => ExecutedError.create(record as ExecutedErrorProps));
      
    }


    static create(record: ExecutedErrorProps): ExecutedError {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ExecutedError(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
