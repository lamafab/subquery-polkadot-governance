// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PreiamgeReapedProps = Omit<PreiamgeReaped, NonNullable<FunctionPropertyNames<PreiamgeReaped>>>;

export class PreiamgeReaped implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public proposal_hash: string;

    public provider: string;

    public deposit: bigint;

    public reaper: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PreiamgeReaped entity without an ID");
        await store.set('PreiamgeReaped', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PreiamgeReaped entity without an ID");
        await store.remove('PreiamgeReaped', id.toString());
    }

    static async get(id:string): Promise<PreiamgeReaped | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PreiamgeReaped entity without an ID");
        const record = await store.get('PreiamgeReaped', id.toString());
        if (record){
            return PreiamgeReaped.create(record as PreiamgeReapedProps);
        }else{
            return;
        }
    }



    static create(record: PreiamgeReapedProps): PreiamgeReaped {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PreiamgeReaped(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
