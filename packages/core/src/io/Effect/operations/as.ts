import type { LazyArg } from "../../../data/Function"
import type { Effect } from "../definition"

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @tsplus fluent ets/Effect as
 */
export function as_<R, E, A, B>(
  self: Effect<R, E, A>,
  value: LazyArg<B>,
  __tsplusTrace?: string
): Effect<R, E, B> {
  return self.map(value)
}

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @ets_data_first as_
 */
export function as<B>(value: LazyArg<B>, __tsplusTrace?: string) {
  return <R, E, A>(self: Effect<R, E, A>): Effect<R, E, B> => self.as(value)
}
