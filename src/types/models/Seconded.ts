// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type SecondedProps = Omit<Seconded, NonNullable<FunctionPropertyNames<Seconded>>>;

export class Seconded implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public seconder: string;

    public prop_index: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Seconded entity without an ID");
        await store.set('Seconded', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Seconded entity without an ID");
        await store.remove('Seconded', id.toString());
    }

    static async get(id:string): Promise<Seconded | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Seconded entity without an ID");
        const record = await store.get('Seconded', id.toString());
        if (record){
            return Seconded.create(record as SecondedProps);
        }else{
            return;
        }
    }



    static create(record: SecondedProps): Seconded {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Seconded(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
