// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';



import {
    DispatchResult,
} from '../enums'


type ExecutedProps = Omit<Executed, NonNullable<FunctionPropertyNames<Executed>>>;

export class Executed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public ref_index: number;

    public resultType: DispatchResult;

    public errorId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Executed entity without an ID");
        await store.set('Executed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Executed entity without an ID");
        await store.remove('Executed', id.toString());
    }

    static async get(id:string): Promise<Executed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Executed entity without an ID");
        const record = await store.get('Executed', id.toString());
        if (record){
            return Executed.create(record as ExecutedProps);
        }else{
            return;
        }
    }


    static async getByErrorId(errorId: string): Promise<Executed[] | undefined>{
      
      const records = await store.getByField('Executed', 'errorId', errorId);
      return records.map(record => Executed.create(record as ExecutedProps));
      
    }


    static create(record: ExecutedProps): Executed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Executed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
