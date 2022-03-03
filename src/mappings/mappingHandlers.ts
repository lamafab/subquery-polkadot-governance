import { SubstrateExtrinsic, SubstrateEvent, SubstrateBlock } from "@subql/types";
import { Proposed, Tabled, ExternalTabled } from "../types";
import { Balance, PropIndex, AccountId } from "@polkadot/types/interfaces";

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

export async function handleProposed(event: SubstrateEvent): Promise<void> {
    const { event: { data: [prop_idx, deposit] } } = event;
    const e = new Proposed(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.proposal_index = (prop_idx as PropIndex).toNumber();
    e.deposit = (deposit as Balance).toBigInt();

    await e.save();
}

export async function handleTabled(event: SubstrateEvent): Promise<void> {
    const { event: { data: [prop_idx, deposit, depositors] } } = event;
    const e = new Tabled(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.proposal_index = (prop_idx as PropIndex).toNumber();
    e.deposit = (deposit as Balance).toBigInt();
    e.depositors = ((depositors as unknown) as Array<AccountId>)
        .map(account => { return account.toString() });

    await e.save();
}

export async function handleExternalTabled(event: SubstrateEvent): Promise<void> {
    const { event: { data: [prop_idx, deposit, depositors] } } = event;
    const e = new Tabled(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();

    await e.save();
}
