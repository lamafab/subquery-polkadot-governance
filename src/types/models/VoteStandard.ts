// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type VoteStandardProps = Omit<VoteStandard, NonNullable<FunctionPropertyNames<VoteStandard>>>;

export class VoteStandard implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public voteId: string;

    public balance: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save VoteStandard entity without an ID");
        await store.set('VoteStandard', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove VoteStandard entity without an ID");
        await store.remove('VoteStandard', id.toString());
    }

    static async get(id:string): Promise<VoteStandard | undefined>{
        assert((id !== null && id !== undefined), "Cannot get VoteStandard entity without an ID");
        const record = await store.get('VoteStandard', id.toString());
        if (record){
            return VoteStandard.create(record as VoteStandardProps);
        }else{
            return;
        }
    }


    static async getByVoteId(voteId: string): Promise<VoteStandard[] | undefined>{
      
      const records = await store.getByField('VoteStandard', 'voteId', voteId);
      return records.map(record => VoteStandard.create(record as VoteStandardProps));
      
    }


    static create(record: VoteStandardProps): VoteStandard {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new VoteStandard(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
