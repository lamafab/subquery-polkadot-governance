// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PreimageReapedProps = Omit<PreimageReaped, NonNullable<FunctionPropertyNames<PreimageReaped>>>;

export class PreimageReaped implements Entity {

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
        assert(id !== null, "Cannot save PreimageReaped entity without an ID");
        await store.set('PreimageReaped', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PreimageReaped entity without an ID");
        await store.remove('PreimageReaped', id.toString());
    }

    static async get(id:string): Promise<PreimageReaped | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PreimageReaped entity without an ID");
        const record = await store.get('PreimageReaped', id.toString());
        if (record){
            return PreimageReaped.create(record as PreimageReapedProps);
        }else{
            return;
        }
    }



    static create(record: PreimageReapedProps): PreimageReaped {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PreimageReaped(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
