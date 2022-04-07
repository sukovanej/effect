/**
 * Access the environment.
 *
 * @tsplus static ets/Sync environment
 */
export function environment<R>(): Sync<R, never, R> {
  return XPure.environment<R>();
}