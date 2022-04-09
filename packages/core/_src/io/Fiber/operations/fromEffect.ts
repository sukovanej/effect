/**
 * Lifts an `Effect` into a `Fiber`.
 *
 * @tsplus static ets/Fiber/Ops fromEffect
 */
export function fromEffect<E, A>(
  effect: IO<E, A>,
  __tsplusTrace?: string
): UIO<Fiber<E, A>> {
  return effect.exit().map(Fiber.done);
}
