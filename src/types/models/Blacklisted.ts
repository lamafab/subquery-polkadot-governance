// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type BlacklistedProps = Omit<Blacklisted, NonNullable<FunctionPropertyNames<Blacklisted>>>;

export class Blacklisted implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public proposal_hash: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Blacklisted entity without an ID");
        await store.set('Blacklisted', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Blacklisted entity without an ID");
        await store.remove('Blacklisted', id.toString());
    }

    static async get(id:string): Promise<Blacklisted | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Blacklisted entity without an ID");
        const record = await store.get('Blacklisted', id.toString());
        if (record){
            return Blacklisted.create(record as BlacklistedProps);
        }else{
            return;
        }
    }



    static create(record: BlacklistedProps): Blacklisted {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Blacklisted(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
