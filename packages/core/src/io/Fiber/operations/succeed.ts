import { Exit } from "../../Exit"
import { Fiber } from "../definition"

/**
 * Returns a fiber that has already succeeded with the specified value.
 *
 * @tsplus static ets/FiberOps succeed
 */
export function succeed<A>(a: A): Fiber<never, A> {
  return Fiber.done(Exit.succeed(a))
}
