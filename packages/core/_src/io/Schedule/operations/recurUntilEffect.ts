/**
 * A schedule that recurs for until the predicate evaluates to true.
 *
 * @tsplus static ets/Schedule/Ops recurUntilEffect
 */
export function recurUntilEffect<Env, A>(
  f: (a: A) => RIO<Env, boolean>
): Schedule.WithState<void, Env, A, A> {
  return Schedule.identity<A>().untilInputEffect(f);
}