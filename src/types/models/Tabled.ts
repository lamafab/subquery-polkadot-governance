// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type TabledProps = Omit<Tabled, NonNullable<FunctionPropertyNames<Tabled>>>;

export class Tabled implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public proposal_index: number;

    public deposit: bigint;

    public depositors: string[];


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Tabled entity without an ID");
        await store.set('Tabled', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Tabled entity without an ID");
        await store.remove('Tabled', id.toString());
    }

    static async get(id:string): Promise<Tabled | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Tabled entity without an ID");
        const record = await store.get('Tabled', id.toString());
        if (record){
            return Tabled.create(record as TabledProps);
        }else{
            return;
        }
    }



    static create(record: TabledProps): Tabled {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Tabled(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
