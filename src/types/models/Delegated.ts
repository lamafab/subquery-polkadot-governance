// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type DelegatedProps = Omit<Delegated, NonNullable<FunctionPropertyNames<Delegated>>>;

export class Delegated implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public who: string;

    public target: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Delegated entity without an ID");
        await store.set('Delegated', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Delegated entity without an ID");
        await store.remove('Delegated', id.toString());
    }

    static async get(id:string): Promise<Delegated | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Delegated entity without an ID");
        const record = await store.get('Delegated', id.toString());
        if (record){
            return Delegated.create(record as DelegatedProps);
        }else{
            return;
        }
    }



    static create(record: DelegatedProps): Delegated {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Delegated(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
