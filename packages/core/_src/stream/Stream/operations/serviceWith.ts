/**
 * Accesses the specified service in the environment of the stream.
 *
 * @tsplus static ets/Stream/Ops serviceWith
 */
export function serviceWith<T>(service: Service<T>) {
  return <A>(f: (resource: T) => A, __tsplusTrace?: string): Stream<Has<T>, never, A> =>
    Stream.fromEffect(Effect.serviceWith(service)(f));
}
