// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type VetoedProps = Omit<Vetoed, NonNullable<FunctionPropertyNames<Vetoed>>>;

export class Vetoed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public who: string;

    public proposal_hash: string;

    public until: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Vetoed entity without an ID");
        await store.set('Vetoed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Vetoed entity without an ID");
        await store.remove('Vetoed', id.toString());
    }

    static async get(id:string): Promise<Vetoed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Vetoed entity without an ID");
        const record = await store.get('Vetoed', id.toString());
        if (record){
            return Vetoed.create(record as VetoedProps);
        }else{
            return;
        }
    }



    static create(record: VetoedProps): Vetoed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Vetoed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
