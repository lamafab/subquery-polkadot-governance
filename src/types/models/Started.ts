// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';



import {
    VoteThreshold,
} from '../enums'


type StartedProps = Omit<Started, NonNullable<FunctionPropertyNames<Started>>>;

export class Started implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ref_index: number;

    public threshold: VoteThreshold;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Started entity without an ID");
        await store.set('Started', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Started entity without an ID");
        await store.remove('Started', id.toString());
    }

    static async get(id:string): Promise<Started | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Started entity without an ID");
        const record = await store.get('Started', id.toString());
        if (record){
            return Started.create(record as StartedProps);
        }else{
            return;
        }
    }



    static create(record: StartedProps): Started {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Started(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
