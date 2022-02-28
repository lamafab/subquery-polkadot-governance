// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PreimageNotedProps = Omit<PreimageNoted, NonNullable<FunctionPropertyNames<PreimageNoted>>>;

export class PreimageNoted implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public proposal_hash: string;

    public who: string;

    public deposit: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PreimageNoted entity without an ID");
        await store.set('PreimageNoted', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PreimageNoted entity without an ID");
        await store.remove('PreimageNoted', id.toString());
    }

    static async get(id:string): Promise<PreimageNoted | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PreimageNoted entity without an ID");
        const record = await store.get('PreimageNoted', id.toString());
        if (record){
            return PreimageNoted.create(record as PreimageNotedProps);
        }else{
            return;
        }
    }



    static create(record: PreimageNotedProps): PreimageNoted {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PreimageNoted(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
