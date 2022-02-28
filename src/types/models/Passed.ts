// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PassedProps = Omit<Passed, NonNullable<FunctionPropertyNames<Passed>>>;

export class Passed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public ref_index: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Passed entity without an ID");
        await store.set('Passed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Passed entity without an ID");
        await store.remove('Passed', id.toString());
    }

    static async get(id:string): Promise<Passed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Passed entity without an ID");
        const record = await store.get('Passed', id.toString());
        if (record){
            return Passed.create(record as PassedProps);
        }else{
            return;
        }
    }



    static create(record: PassedProps): Passed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Passed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
