// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PreimageMissingProps = Omit<PreimageMissing, NonNullable<FunctionPropertyNames<PreimageMissing>>>;

export class PreimageMissing implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public proposal_hash: string;

    public ref_index: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PreimageMissing entity without an ID");
        await store.set('PreimageMissing', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PreimageMissing entity without an ID");
        await store.remove('PreimageMissing', id.toString());
    }

    static async get(id:string): Promise<PreimageMissing | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PreimageMissing entity without an ID");
        const record = await store.get('PreimageMissing', id.toString());
        if (record){
            return PreimageMissing.create(record as PreimageMissingProps);
        }else{
            return;
        }
    }



    static create(record: PreimageMissingProps): PreimageMissing {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PreimageMissing(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
