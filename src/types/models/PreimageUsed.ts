// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PreimageUsedProps = Omit<PreimageUsed, NonNullable<FunctionPropertyNames<PreimageUsed>>>;

export class PreimageUsed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public proposal_hash: string;

    public provider: string;

    public deposit: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PreimageUsed entity without an ID");
        await store.set('PreimageUsed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PreimageUsed entity without an ID");
        await store.remove('PreimageUsed', id.toString());
    }

    static async get(id:string): Promise<PreimageUsed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PreimageUsed entity without an ID");
        const record = await store.get('PreimageUsed', id.toString());
        if (record){
            return PreimageUsed.create(record as PreimageUsedProps);
        }else{
            return;
        }
    }



    static create(record: PreimageUsedProps): PreimageUsed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PreimageUsed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
