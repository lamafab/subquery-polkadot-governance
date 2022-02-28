// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ProposedProps = Omit<Proposed, NonNullable<FunctionPropertyNames<Proposed>>>;

export class Proposed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public proposal_index: number;

    public deposit: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Proposed entity without an ID");
        await store.set('Proposed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Proposed entity without an ID");
        await store.remove('Proposed', id.toString());
    }

    static async get(id:string): Promise<Proposed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Proposed entity without an ID");
        const record = await store.get('Proposed', id.toString());
        if (record){
            return Proposed.create(record as ProposedProps);
        }else{
            return;
        }
    }



    static create(record: ProposedProps): Proposed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Proposed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
