import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    /*
    const {event: {data: [account, balance]}} = event;
    //Retrieve the record by its ID
    const record = await StarterEntity.get(event.block.block.header.hash.toString());
    record.field2 = account.toString();
    //Big integer type Balance of a transfer event
    record.field3 = (balance as Balance).toBigInt();
    await record.save();
    */
}
