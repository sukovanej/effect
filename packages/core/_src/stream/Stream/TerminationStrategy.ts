/**
 * @tsplus type ets/Stream/TerminationStrategy
 */
export type TerminationStrategy = Left | Right | Both | Either;

export interface Left {
  readonly _tag: "Left";
}

export interface Right {
  readonly _tag: "Right";
}

export interface Both {
  readonly _tag: "Both";
}

export interface Either {
  readonly _tag: "Either";
}

/**
 * @tsplus type ets/Stream/TerminationStrategy/Ops
 */
export interface TerminationStrategyOps {}
export const TerminationStrategy: TerminationStrategyOps = {};

/**
 * @tsplus static ets/Stream/TerminationStrategy/Ops Left
 */
export const left: TerminationStrategy = {
  _tag: "Left"
};

/**
 * @tsplus static ets/Stream/TerminationStrategy/Ops Right
 */
export const right: TerminationStrategy = {
  _tag: "Right"
};

/**
 * @tsplus static ets/Stream/TerminationStrategy/Ops Both
 */
export const both: TerminationStrategy = {
  _tag: "Both"
};

/**
 * @tsplus static ets/Stream/TerminationStrategy/Ops Either
 */
export const either: TerminationStrategy = {
  _tag: "Either"
};
