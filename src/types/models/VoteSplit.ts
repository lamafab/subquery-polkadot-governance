// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type VoteSplitProps = Omit<VoteSplit, NonNullable<FunctionPropertyNames<VoteSplit>>>;

export class VoteSplit implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public aye?: bigint;

    public nay?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save VoteSplit entity without an ID");
        await store.set('VoteSplit', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove VoteSplit entity without an ID");
        await store.remove('VoteSplit', id.toString());
    }

    static async get(id:string): Promise<VoteSplit | undefined>{
        assert((id !== null && id !== undefined), "Cannot get VoteSplit entity without an ID");
        const record = await store.get('VoteSplit', id.toString());
        if (record){
            return VoteSplit.create(record as VoteSplitProps);
        }else{
            return;
        }
    }



    static create(record: VoteSplitProps): VoteSplit {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new VoteSplit(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
