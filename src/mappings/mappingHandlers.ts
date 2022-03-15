import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import {
  Proposed,
  Tabled,
  ExternalTabled,
  Started,
  VoteThreshold,
  Passed,
  NotPassed,
  Cancelled,
  Executed,
  Delegated,
  Undelegated,
  Vetoed,
  PreimageNoted,
  PreimageUsed,
  PreimageInvalid,
  PreimageMissing,
  PreimageReaped,
  Blacklisted,
  Voted,
  VoteType,
  VoteStandard,
  VoteSplit,
  Vote,
  Conviction,
  DispatchResult,
  ExecutedError,
  DispatchError,
  ModuleError,
  TokenError,
  ArithmeticError,
  Seconded,
} from "../types";
import {
  Hash,
  BlockNumber,
  Balance,
  PropIndex,
  ReferendumIndex,
  AccountId,
  VoteThreshold as VoteThresholdPrimitive,
  DispatchResult as DispatchResultPrimitive,
  AccountVote as AccountVotePrimitive,
} from "@polkadot/types/interfaces";

export async function handleProposed(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [prop_idx, deposit],
    },
  } = event;
  const e = new Proposed(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.proposal_index = (prop_idx as PropIndex).toNumber();
  e.deposit = (deposit as Balance).toBigInt();

  await e.save();
}

export async function handleTabled(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [prop_idx, deposit, depositors],
    },
  } = event;
  const e = new Tabled(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.proposal_index = (prop_idx as PropIndex).toNumber();
  e.deposit = (deposit as Balance).toBigInt();
  e.depositors = (depositors as unknown as Array<AccountId>).map((account) => {
    return account.toString();
  });

  await e.save();
}

export async function handleExternalTabled(
  event: SubstrateEvent
): Promise<void> {
  const e = new ExternalTabled(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();

  await e.save();
}

export async function handleStarted(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [ref_index, threshold],
    },
  } = event;
  const e = new Started(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.ref_index = (ref_index as ReferendumIndex).toNumber();

  let vote;
  let t = threshold as VoteThresholdPrimitive;
  if (t.isSuperMajorityAgainst) {
    vote = VoteThreshold.SUPER_MAJORITY_APPROVE;
  } else if (t.isSuperMajorityAgainst) {
    vote = VoteThreshold.SUPER_MAJORITY_AGAINST;
  } else if (t.isSimpleMajority) {
    vote = VoteThreshold.SIMPLE_MAJORITY;
  }

  e.threshold = vote;

  await e.save();
}

export async function handlePassed(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [ref_index],
    },
  } = event;
  const e = new Passed(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.ref_index = (ref_index as ReferendumIndex).toNumber();

  await e.save();
}

export async function handleNotPassed(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [ref_index],
    },
  } = event;
  const e = new NotPassed(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.ref_index = (ref_index as ReferendumIndex).toNumber();

  await e.save();
}

export async function handleCancelled(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [ref_index],
    },
  } = event;
  const e = new Cancelled(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.ref_index = (ref_index as ReferendumIndex).toNumber();

  await e.save();
}

export async function handleExecuted(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [ref_index, result],
    },
  } = event;
  const id = `${event.block.block.header.number}-${event.idx.toString()}`;
  const e = new Executed(id);

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.ref_index = (ref_index as ReferendumIndex).toNumber();

  const res = result as DispatchResultPrimitive;
  if (res.isOk) {
    e.resultType = DispatchResult.OK;
  } else if (res.isErr) {
    e.resultType = DispatchResult.ERR;

    // Setup Error
    const err = new ExecutedError(`${id}-exe-err`);

    // TODO: `TooManyConsumers` is missing?
    if (res.asErr.isOther) {
      err.type = DispatchError.OTHER;
    } else if (res.asErr.isCannotLookup) {
      err.type = DispatchError.CANNOT_LOOKUP;
    } else if (res.asErr.isBadOrigin) {
      err.type = DispatchError.BAD_ORIGIN;
    } else if (res.asErr.isModule) {
      err.type = DispatchError.MODULE;

      // Setup `ModuleError`.
      const mod_err = new ModuleError(`${id}-mod-err`);
      mod_err.index = res.asErr.asModule.index.toNumber();
      mod_err.error = res.asErr.asModule.error.toNumber();
      await mod_err.save();

      // Commit to primariy type.
      err.moduleId = mod_err.id.toString();
    } else if (res.asErr.isConsumerRemaining) {
      err.type = DispatchError.CONSUMER_REMAINING;
    } else if (res.asErr.isNoProviders) {
      err.type = DispatchError.NO_PROVIDERS;
    } else if (res.asErr.isToken) {
      err.type = DispatchError.TOKEN;

      const t = res.asErr.asToken;
      if (t.isNoFunds) {
        err.token = TokenError.NO_FUNDS;
      } else if (t.isWouldDie) {
        err.token = TokenError.WOULD_DIE;
      } else if (t.isBelowMinimum) {
        err.token = TokenError.BELOW_MINIMUM;
      } else if (t.isCannotCreate) {
        err.token = TokenError.CANNOT_CREATE;
      } else if (t.isUnknownAsset) {
        err.token = TokenError.UNKNOWN_ASSET;
      } else if (t.isFrozen) {
        err.token = TokenError.FROZEN;
      } else if (t.isUnderflow) {
        err.arithmetic = ArithmeticError.UNDERFLOW;
      } else if (t.isOverflow) {
        err.arithmetic = ArithmeticError.OVERFLOW;
      }
    } else if (res.asErr.isArithmetic) {
      err.type = DispatchError.ARITHMETIC;
    }

    await err.save();

    // Commit to primary type.
    e.errorId = err.id.toString();
  }

  await e.save();
}

export async function handleDelegated(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [who, target],
    },
  } = event;
  const e = new Delegated(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.who = (who as AccountId).toString();
  e.target = (target as AccountId).toString();

  await e.save();
}

export async function handleUndelegated(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account],
    },
  } = event;
  const e = new Undelegated(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.account = (account as AccountId).toString();

  await e.save();
}

export async function handleVetoed(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [who, proposal_hash, until],
    },
  } = event;
  const e = new Vetoed(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.who = (who as AccountId).toString();
  e.proposal_hash = (proposal_hash as Hash).toString();
  e.until = (until as BlockNumber).toNumber();

  await e.save();
}

export async function handlePreimageNoted(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [proposal_hash, who, deposit],
    },
  } = event;
  const e = new PreimageNoted(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.proposal_hash = (proposal_hash as Hash).toString();
  e.who = (who as AccountId).toString();
  e.deposit = (deposit as Balance).toBigInt();

  await e.save();
}

export async function handlePreimageUsed(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [proposal_hash, provider, deposit],
    },
  } = event;
  const e = new PreimageUsed(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.proposal_hash = (proposal_hash as Hash).toString();
  e.provider = (provider as AccountId).toString();
  e.deposit = (deposit as Balance).toBigInt();

  await e.save();
}

export async function handlePreimageInvalid(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [proposal_hash, ref_index],
    },
  } = event;
  const e = new PreimageInvalid(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.proposal_hash = (proposal_hash as Hash).toString();
  e.ref_index = (ref_index as ReferendumIndex).toNumber();

  await e.save();
}

export async function handlePreimageMissing(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [proposal_hash, ref_index],
    },
  } = event;
  const e = new PreimageMissing(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.proposal_hash = (proposal_hash as Hash).toString();
  e.ref_index = (ref_index as ReferendumIndex).toNumber();

  await e.save();
}

export async function handlePreimageReaped(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [proposal_hash, provider, deposit, reaper],
    },
  } = event;
  const e = new PreimageReaped(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.proposal_hash = (proposal_hash as Hash).toString();
  e.provider = (provider as AccountId).toString();
  e.deposit = (deposit as Balance).toBigInt();
  e.reaper = (reaper as AccountId).toString();

  await e.save();
}

export async function handleBlacklisted(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [proposal_hash],
    },
  } = event;
  const e = new Blacklisted(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.proposal_hash = (proposal_hash as Hash).toString();

  await e.save();
}

export async function handleVoted(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [voter, ref_index, vote],
    },
  } = event;
  const id = `${event.block.block.header.number}-${event.idx.toString()}`;
  const e = new Voted(id);

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.voter = (voter as AccountId).toString();
  e.ref_index = (ref_index as ReferendumIndex).toNumber();

  let vp = vote as AccountVotePrimitive;
  if (vp.isStandard) {
    // Setup `Vote`.
    const vote = new Vote(`${id}-vote`);
    if (vp.asStandard.vote.isAye) {
      vote.aye = true;
    } else {
      let r;
      const c = vp.asStandard.vote.conviction;
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
    vstd.balance = vp.asStandard.balance.toBigInt();
    await vstd.save();

    // Commit to primary type.
    e.voteType = VoteType.STANDARD;
    e.voteStandardId = vstd.id.toString();
  } else if (vp.isSplit) {
    const aye = vp.asSplit.aye;
    const nay = vp.asSplit.nay;

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
    e.voteSplitId = vsplit.id.toString();
  }

  await e.save();
}

export async function handleSeconded(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [seconder, prop_index],
    },
  } = event;
  const e = new Seconded(
    `${event.block.block.header.number}-${event.idx.toString()}`
  );

  e.block = event.block.block.hash.toHuman();
  e.timestamp = new Date().toISOString();
  e.seconder = (seconder as AccountId).toString();
  e.prop_index = (prop_index as PropIndex).toNumber();

  await e.save();
}
