import { SubstrateExtrinsic, SubstrateEvent, SubstrateBlock } from "@subql/types";
import { Proposed, Tabled, ExternalTabled, Started, VoteThreshold, Passed, NotPassed, Cancelled } from "../types";
import { Balance, PropIndex, ReferendumIndex, AccountId, VoteThreshold as VoteThresholdPrimitive } from "@polkadot/types/interfaces";

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
    const e = new ExternalTabled(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();

    await e.save();
}

export async function handleStarted(event: SubstrateEvent): Promise<void> {
    const { event: { data: [ref_index, threshold] } } = event;
    const e = new Started(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    let vote;
    let t = (threshold as VoteThresholdPrimitive);
    if (t.isSuperMajorityAgainst) {
        vote = VoteThreshold.SUPER_MAJORITY_APPROVE
    } else if (t.isSuperMajorityAgainst) {
        vote = VoteThreshold.SUPER_MAJORITY_AGAINST
    } else if (t.isSimpleMajority) {
        vote = VoteThreshold.SIMPLE_MAJORITY;
    }

    e.threshold = vote;

    await e.save();
}

export async function handlePassed(event: SubstrateEvent): Promise<void> {
    const { event: { data: [ref_index, threshold] } } = event;
    const e = new Passed(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    await e.save();
}

export async function handleNotPassed(event: SubstrateEvent): Promise<void> {
    const { event: { data: [ref_index, threshold] } } = event;
    const e = new NotPassed(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    await e.save();
}

export async function handleCancelled(event: SubstrateEvent): Promise<void> {
    const { event: { data: [ref_index, threshold] } } = event;
    const e = new Cancelled(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    await e.save();
}
