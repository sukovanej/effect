import * as core from "../../../Effect/core"
import type { Effect } from "../../../Effect/effect"
import * as coreZip from "../../../Effect/zipWith"
import * as List from "./core"

/**
 * Filters this list by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 */
export function filterM_<R, E, A>(
  self: List.List<A>,
  f: (a: A) => Effect<R, E, boolean>
): Effect<R, E, List.List<A>> {
  return core.suspend(() => {
    let dest: Effect<R, E, List.List<A>> = core.succeed(List.empty<A>())

    for (const a of self) {
      dest = coreZip.zipWith_(dest, f(a), (d, b) => (b ? List.append_(d, a) : d))
    }

    return dest
  })
}

/**
 * Filters this list by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 *
 * @dataFirst filterM_
 */
export function filterM<R, E, A>(
  f: (a: A) => Effect<R, E, boolean>
): (self: List.List<A>) => Effect<R, E, List.List<A>> {
  return (self) => filterM_(self, f)
}
