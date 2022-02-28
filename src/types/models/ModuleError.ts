// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ModuleErrorProps = Omit<ModuleError, NonNullable<FunctionPropertyNames<ModuleError>>>;

export class ModuleError implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public index: number;

    public error: number;

    public message?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ModuleError entity without an ID");
        await store.set('ModuleError', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ModuleError entity without an ID");
        await store.remove('ModuleError', id.toString());
    }

    static async get(id:string): Promise<ModuleError | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ModuleError entity without an ID");
        const record = await store.get('ModuleError', id.toString());
        if (record){
            return ModuleError.create(record as ModuleErrorProps);
        }else{
            return;
        }
    }



    static create(record: ModuleErrorProps): ModuleError {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ModuleError(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
