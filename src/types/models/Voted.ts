// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';



import {
    VoteType,
} from '../enums'


type VotedProps = Omit<Voted, NonNullable<FunctionPropertyNames<Voted>>>;

export class Voted implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public voter: string;

    public ref_index: number;

    public voteType: VoteType;

    public voteStandardId: string;

    public voteSplitId: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Voted entity without an ID");
        await store.set('Voted', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Voted entity without an ID");
        await store.remove('Voted', id.toString());
    }

    static async get(id:string): Promise<Voted | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Voted entity without an ID");
        const record = await store.get('Voted', id.toString());
        if (record){
            return Voted.create(record as VotedProps);
        }else{
            return;
        }
    }


    static async getByVoteStandardId(voteStandardId: string): Promise<Voted[] | undefined>{
      
      const records = await store.getByField('Voted', 'voteStandardId', voteStandardId);
      return records.map(record => Voted.create(record as VotedProps));
      
    }

    static async getByVoteSplitId(voteSplitId: string): Promise<Voted[] | undefined>{
      
      const records = await store.getByField('Voted', 'voteSplitId', voteSplitId);
      return records.map(record => Voted.create(record as VotedProps));
      
    }


    static create(record: VotedProps): Voted {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Voted(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
