import { SubstrateExtrinsic, SubstrateEvent, SubstrateBlock } from "@subql/types";
import { Proposed, Tabled, ExternalTabled, Started, VoteThreshold, Passed, NotPassed, Cancelled, Executed, Delegated, Undelegated, Vetoed, PreimageNoted, PreimageUsed, PreimageInvalid, PreimageMissing, PreiamgeReaped, Blacklisted, Voted, VoteType, VoteStandard, VoteSplit, Vote, Conviction } from "../types";
import { Hash, BlockNumber, Balance, PropIndex, ReferendumIndex, AccountId, VoteThreshold as VoteThresholdPrimitive, AccountVote as AccountVotePrimitive } from "@polkadot/types/interfaces";

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
    const { event: { data: [ref_index] } } = event;
    const e = new Passed(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    await e.save();
}

export async function handleNotPassed(event: SubstrateEvent): Promise<void> {
    const { event: { data: [ref_index] } } = event;
    const e = new NotPassed(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    await e.save();
}

export async function handleCancelled(event: SubstrateEvent): Promise<void> {
    const { event: { data: [ref_index] } } = event;
    const e = new Cancelled(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    await e.save();
}

export async function handleExecuted(event: SubstrateEvent): Promise<void> {
    const { event: { data: [ref_index, result] } } = event;
    const e = new Cancelled(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();

    // TODO

    await e.save();
}

export async function handleDelegated(event: SubstrateEvent): Promise<void> {
    const { event: { data: [who, target] } } = event;
    const e = new Delegated(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.who = (who as AccountId).toString();
    e.target = (target as AccountId).toString();

    await e.save();
}

export async function handleUndelegated(event: SubstrateEvent): Promise<void> {
    const { event: { data: [account] } } = event;
    const e = new Undelegated(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.account = (account as AccountId).toString();

    await e.save();
}

export async function handleVetoed(event: SubstrateEvent): Promise<void> {
    const { event: { data: [who, proposal_hash, until] } } = event;
    const e = new Vetoed(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.who = (who as AccountId).toString();
    e.proposal_hash = (proposal_hash as Hash).toString();
    e.until = (until as BlockNumber).toNumber();

    await e.save();
}

export async function handlePreimageNoted(event: SubstrateEvent): Promise<void> {
    const { event: { data: [proposal_hash, who, deposit] } } = event;
    const e = new PreimageNoted(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.proposal_hash = (proposal_hash as Hash).toString();
    e.who = (who as AccountId).toString();
    e.deposit = (deposit as Balance).toBigInt();

    await e.save();
}

export async function handlePreimageUsed(event: SubstrateEvent): Promise<void> {
    const { event: { data: [proposal_hash, provider, deposit] } } = event;
    const e = new PreimageUsed(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.proposal_hash = (proposal_hash as Hash).toString();
    e.provider = (provider as AccountId).toString();
    e.deposit = (deposit as Balance).toBigInt();

    await e.save();
}

export async function handlePreimageInvalid(event: SubstrateEvent): Promise<void> {
    const { event: { data: [proposal_hash, ref_index] } } = event;
    const e = new PreimageInvalid(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.proposal_hash = (proposal_hash as Hash).toString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    await e.save();
}

export async function handlePreimageMissing(event: SubstrateEvent): Promise<void> {
    const { event: { data: [proposal_hash, ref_index] } } = event;
    const e = new PreimageMissing(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.proposal_hash = (proposal_hash as Hash).toString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    await e.save();
}

export async function handlePreimageReaped(event: SubstrateEvent): Promise<void> {
    const { event: { data: [proposal_hash, provider, deposit, reaper] } } = event;
    const e = new PreiamgeReaped(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.proposal_hash = (proposal_hash as Hash).toString();
    e.provider = (provider as AccountId).toString();
    e.deposit = (deposit as Balance).toBigInt();
    e.reaper = (reaper as AccountId).toString();

    await e.save();
}

export async function handleBlacklisted(event: SubstrateEvent): Promise<void> {
    const { event: { data: [proposal_hash] } } = event;
    const e = new Blacklisted(`${event.block.block.header.number}-${event.idx.toString()}`);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.proposal_hash = (proposal_hash as Hash).toString();

    await e.save();
}

export async function handleVoted(event: SubstrateEvent): Promise<void> {
    const { event: { data: [voter, ref_index, vote] } } = event;
    const id = `${event.block.block.header.number}-${event.idx.toString()}`;
    const e = new Voted(id);

    e.block = event.block.block.hash.toHuman();
    e.timestamp = new Date().toISOString();
    e.voter = (voter as AccountId).toString();
    e.ref_index = (ref_index as ReferendumIndex).toNumber();

    let t = (vote as AccountVotePrimitive);
    if (t.isStandard) {
        // Setup `Vote`.
        const vote = new Vote(`${id}-vote`);
        if (t.asStandard.vote.isAye) {
            vote.aye = true;
            vote.conviction = null;
        } else {
            let r;
            const c = t.asStandard.vote.conviction;
            if (c.isNone) {
                r = Conviction.NONE;
            } else if (c.isLocked1x) {
                r = Conviction.LOCKED_1X;
            } else if (c.isLocked2x) {
                r = Conviction.LOCKED_2X;
            } else if (c.isLocked3x) {
                r = Conviction.LOCKED_3X;
            } else if (c.isLocked4x) {
                r = Conviction.LOCKED_4X;
            } else if (c.isLocked5x) {
                r = Conviction.LOCKED_5X;
            } else if (c.isLocked6x) {
                r = Conviction.LOCKED_6X;
            }

            vote.aye = false;
            vote.conviction = r;
        }

        await vote.save();

        // Setup `VoteStandard`.
        const vstd = new VoteStandard(`${id}-standard`);
        vstd.voteId = vote.id.toString();
        vstd.balance = t.asStandard.balance.toBigInt();

        // Commit to primary type.
        e.voteType = VoteType.STANDARD;
        e.voteStandardId = vstd.id.toString();
        e.voteSplitId = null;
    } else if (t.isSplit) {
        const aye = t.asSplit.aye;
        const nay = t.asSplit.nay;

        // Setup `VoteSplit`.
        const vsplit = new VoteSplit(`${id}-split`);
        if (aye != null) {
            vsplit.aye = aye.toBigInt();
        } else if (nay != null) {
            vsplit.nay = nay.toBigInt();
        }

        await vsplit.save();

        // Commit to primary type.
        e.voteType = VoteType.STANDARD;
        e.voteStandardId = null;
        e.voteSplitId = vsplit.id.toString();
    }

    await e.save();
}
