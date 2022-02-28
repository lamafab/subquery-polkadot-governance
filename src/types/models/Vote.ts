// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';



import {
    Conviction,
} from '../enums'


type VoteProps = Omit<Vote, NonNullable<FunctionPropertyNames<Vote>>>;

export class Vote implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public aye?: boolean;

    public conviction?: Conviction;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Vote entity without an ID");
        await store.set('Vote', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Vote entity without an ID");
        await store.remove('Vote', id.toString());
    }

    static async get(id:string): Promise<Vote | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Vote entity without an ID");
        const record = await store.get('Vote', id.toString());
        if (record){
            return Vote.create(record as VoteProps);
        }else{
            return;
        }
    }



    static create(record: VoteProps): Vote {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Vote(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
