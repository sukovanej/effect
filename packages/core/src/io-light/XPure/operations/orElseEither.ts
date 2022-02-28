import { Either } from "../../../data/Either"
import type { LazyArg } from "../../../data/Function"
import { XPure } from "../definition"

/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 *
 * @tsplus fluent ets/XPure orElseEither
 */
export function orElseEither_<W, W1, S1, S2, R, E, A, S3, S4, R2, E2, A2>(
  self: XPure<W, S1, S2, R, E, A>,
  that: LazyArg<XPure<W1, S3, S4, R2, E2, A2>>
): XPure<W | W1, S3 & S1, S4 | S2, R & R2, E2, Either<A, A2>> {
  return self.foldXPure(
    () => that().map((a) => Either.right(a)),
    (a) => XPure.succeed(Either.left(a))
  )
}

/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 *
 * @ets_data_first orElseEither_
 */
export function orElseEither<W, S3, S4, R2, E2, A2>(
  that: LazyArg<XPure<W, S3, S4, R2, E2, A2>>
) {
  return <W1, S1, S2, R, E, A>(
    self: XPure<W1, S1, S2, R, E, A>
  ): XPure<W | W1, S3 & S1, S4 | S2, R & R2, E2, Either<A, A2>> =>
    self.orElseEither(that)
}
