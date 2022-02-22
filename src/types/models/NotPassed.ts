// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type NotPassedProps = Omit<NotPassed, NonNullable<FunctionPropertyNames<NotPassed>>>;

export class NotPassed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ref_index: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NotPassed entity without an ID");
        await store.set('NotPassed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NotPassed entity without an ID");
        await store.remove('NotPassed', id.toString());
    }

    static async get(id:string): Promise<NotPassed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NotPassed entity without an ID");
        const record = await store.get('NotPassed', id.toString());
        if (record){
            return NotPassed.create(record as NotPassedProps);
        }else{
            return;
        }
    }



    static create(record: NotPassedProps): NotPassed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new NotPassed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
