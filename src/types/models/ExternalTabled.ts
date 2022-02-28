// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ExternalTabledProps = Omit<ExternalTabled, NonNullable<FunctionPropertyNames<ExternalTabled>>>;

export class ExternalTabled implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public block: string;

    public timestamp: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ExternalTabled entity without an ID");
        await store.set('ExternalTabled', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ExternalTabled entity without an ID");
        await store.remove('ExternalTabled', id.toString());
    }

    static async get(id:string): Promise<ExternalTabled | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ExternalTabled entity without an ID");
        const record = await store.get('ExternalTabled', id.toString());
        if (record){
            return ExternalTabled.create(record as ExternalTabledProps);
        }else{
            return;
        }
    }



    static create(record: ExternalTabledProps): ExternalTabled {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ExternalTabled(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
