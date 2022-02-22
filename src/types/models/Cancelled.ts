// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type CancelledProps = Omit<Cancelled, NonNullable<FunctionPropertyNames<Cancelled>>>;

export class Cancelled implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ref_index: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Cancelled entity without an ID");
        await store.set('Cancelled', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Cancelled entity without an ID");
        await store.remove('Cancelled', id.toString());
    }

    static async get(id:string): Promise<Cancelled | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Cancelled entity without an ID");
        const record = await store.get('Cancelled', id.toString());
        if (record){
            return Cancelled.create(record as CancelledProps);
        }else{
            return;
        }
    }



    static create(record: CancelledProps): Cancelled {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Cancelled(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
