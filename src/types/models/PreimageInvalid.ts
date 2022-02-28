// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PreimageInvalidProps = Omit<PreimageInvalid, NonNullable<FunctionPropertyNames<PreimageInvalid>>>;

export class PreimageInvalid implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;

    public proposal_hash: string;

    public ref_index: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PreimageInvalid entity without an ID");
        await store.set('PreimageInvalid', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PreimageInvalid entity without an ID");
        await store.remove('PreimageInvalid', id.toString());
    }

    static async get(id:string): Promise<PreimageInvalid | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PreimageInvalid entity without an ID");
        const record = await store.get('PreimageInvalid', id.toString());
        if (record){
            return PreimageInvalid.create(record as PreimageInvalidProps);
        }else{
            return;
        }
    }



    static create(record: PreimageInvalidProps): PreimageInvalid {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PreimageInvalid(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
