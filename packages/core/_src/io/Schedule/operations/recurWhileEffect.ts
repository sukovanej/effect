/**
 * A schedule that recurs for as long as the effectful predicate evaluates to
 * true.
 *
 * @tsplus static ets/Schedule/Ops recurWhileEffect
 */
export function recurWhileEffect<Env, A>(
  f: (a: A) => RIO<Env, boolean>
): Schedule.WithState<void, Env, A, A> {
  return Schedule.identity<A>().whileInputEffect(f);
}
