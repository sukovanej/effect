import { AbstractClock } from "@effect/core/io/Clock/definition";

export class ProxyClock extends AbstractClock {
  constructor(
    readonly currentTime: UIO<number>,
    readonly sleep: (duration: LazyArg<Duration>, __tsplusTrace?: string) => UIO<void>
  ) {
    super();
  }
}
