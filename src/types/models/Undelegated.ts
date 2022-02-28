// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type UndelegatedProps = Omit<Undelegated, NonNullable<FunctionPropertyNames<Undelegated>>>;

export class Undelegated implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public account: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Undelegated entity without an ID");
        await store.set('Undelegated', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Undelegated entity without an ID");
        await store.remove('Undelegated', id.toString());
    }

    static async get(id:string): Promise<Undelegated | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Undelegated entity without an ID");
        const record = await store.get('Undelegated', id.toString());
        if (record){
            return Undelegated.create(record as UndelegatedProps);
        }else{
            return;
        }
    }



    static create(record: UndelegatedProps): Undelegated {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Undelegated(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
