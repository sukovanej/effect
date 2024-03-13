/**
 * @since 1.0.0
 */

import { TaggedError } from "effect/Data"
import * as Effect from "effect/Effect"
import * as Either from "effect/Either"
import type { LazyArg } from "effect/Function"
import { dual } from "effect/Function"
import * as Inspectable from "effect/Inspectable"
import * as Option from "effect/Option"
import type * as ReadonlyArray from "effect/ReadonlyArray"
import type * as AST from "./AST.js"
import * as _parseResult from "./internal/parseResult.js"
import * as TreeFormatter from "./TreeFormatter.js"

/**
 * @since 1.0.0
 */
export class ParseError extends TaggedError("ParseError")<{ readonly error: ParseIssue }> {
  get message() {
    return this.toString()
  }
  /**
   * @since 1.0.0
   */
  toString() {
    return TreeFormatter.formatIssue(this.error)
  }
  /**
   * @since 1.0.0
   */
  toJSON() {
    return {
      _id: "ParseError",
      message: this.toString()
    }
  }
  /**
   * @since 1.0.0
   */
  [Inspectable.NodeInspectSymbol]() {
    return this.toJSON()
  }
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const parseError = (issue: ParseIssue): ParseError => new ParseError({ error: issue })

/**
 * @category constructors
 * @since 1.0.0
 */
export const succeed: <A>(a: A) => Either.Either<A, ParseIssue> = Either.right

/**
 * @category constructors
 * @since 1.0.0
 */
export const fail: (issue: ParseIssue) => Either.Either<never, ParseIssue> = Either.left

const _try: <A>(options: {
  try: LazyArg<A>
  catch: (e: unknown) => ParseIssue
}) => Either.Either<A, ParseIssue> = Either.try

export {
  /**
   * @category constructors
   * @since 1.0.0
   */
  _try as try
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromOption: {
  (onNone: () => ParseIssue): <A>(self: Option.Option<A>) => Either.Either<A, ParseIssue>
  <A>(self: Option.Option<A>, onNone: () => ParseIssue): Either.Either<A, ParseIssue>
} = Either.fromOption

/**
 * @category optimisation
 * @since 1.0.0
 */
export const eitherOrUndefined: <A, E, R>(
  self: Effect.Effect<A, E, R>
) => Either.Either<A, E> | undefined = _parseResult.eitherOrUndefined

/**
 * @category optimisation
 * @since 1.0.0
 */
export const map: {
  <A, B>(f: (a: A) => B): <E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<B, E, R>
  <A, E, R, B>(self: Effect.Effect<A, E, R>, f: (a: A) => B): Effect.Effect<B, E, R>
} = _parseResult.map

/**
 * @category optimisation
 * @since 1.0.0
 */
export const mapError: {
  <E, E2>(f: (e: E) => E2): <A, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E2, R>
  <A, E, R, E2>(self: Effect.Effect<A, E, R>, f: (e: E) => E2): Effect.Effect<A, E2, R>
} = _parseResult.mapError

/**
 * @category optimisation
 * @since 1.0.0
 */
export const flatMap: {
  <A, B, E1, R1>(
    f: (a: A) => Effect.Effect<B, E1, R1>
  ): <E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<B, E1 | E, R1 | R>
  <A, E, R, B, E1, R1>(
    self: Effect.Effect<A, E, R>,
    f: (a: A) => Effect.Effect<B, E1, R1>
  ): Effect.Effect<B, E | E1, R | R1>
} = _parseResult.flatMap

/**
 * Error that occurs when an array or tuple has an error.
 *
 * @category model
 * @since 1.0.0
 */
export class Tuple {
  readonly _tag = "TupleType"
  constructor(
    readonly ast: AST.TupleType,
    readonly actual: unknown,
    readonly errors: ReadonlyArray.NonEmptyReadonlyArray<Index>
  ) {}
}

/**
 * The `Index` error indicates that there was an error at a specific index in an array or tuple.
 *
 * @category model
 * @since 1.0.0
 */
export class Index {
  readonly _tag = "Index"
  constructor(readonly index: number, readonly error: ParseIssue | Missing | Unexpected) {}
}

/**
 * Error that occurs when a type literal or record has an error.
 *
 * @category model
 * @since 1.0.0
 */
export class TypeLiteral {
  readonly _tag = "TypeLiteral"
  constructor(
    readonly ast: AST.TypeLiteral,
    readonly actual: unknown,
    readonly errors: ReadonlyArray.NonEmptyReadonlyArray<Key>
  ) {}
}

/**
 * The `Key` variant of the `ParseIssue` type represents an error that occurs when a key in a type literal or record is invalid.
 *
 * @category model
 * @since 1.0.0
 */
export class Key {
  readonly _tag = "Key"
  constructor(readonly key: PropertyKey, readonly error: ParseIssue | Missing | Unexpected) {}
}

/**
 * Error that occurs when an unexpected key or index is present.
 *
 * @category model
 * @since 1.0.0
 */
export class Unexpected {
  readonly _tag = "Unexpected"
  constructor(readonly ast: AST.AST) {}
}

/**
 * Error that occurs when a transformation has an error.
 *
 * @category model
 * @since 1.0.0
 */
export class Transformation {
  readonly _tag = "Transformation"
  constructor(
    readonly ast: AST.Transformation,
    readonly actual: unknown,
    readonly kind: "Encoded" | "Transformation" | "Type",
    readonly error: ParseIssue
  ) {}
}

/**
 * The `Type` variant of the `ParseIssue` type represents an error that occurs when the `actual` value is not of the expected type.
 * The `ast` field specifies the expected type, and the `actual` field contains the value that caused the error.
 *
 * @category model
 * @since 1.0.0
 */
export class Type {
  readonly _tag = "Type"
  readonly message: Option.Option<string>
  constructor(readonly ast: AST.AST, readonly actual: unknown, message?: string) {
    this.message = Option.fromNullable(message)
  }
}

/**
 * The `Forbidden` variant of the `ParseIssue` type represents a forbidden operation, such as when encountering an Effect that is not allowed to execute (e.g., using `runSync`).
 *
 * @category model
 * @since 1.0.0
 */
export class Forbidden {
  readonly _tag = "Forbidden"
  readonly message: Option.Option<string>
  constructor(readonly ast: AST.AST, readonly actual: unknown, message?: string) {
    this.message = Option.fromNullable(message)
  }
}

/**
 * Error that occurs when a required key or index is missing.
 *
 * @category model
 * @since 1.0.0
 */
export class Missing {
  readonly _tag = "Missing"
}

/**
 * Error that occurs when a refinement has an error.
 *
 * @category model
 * @since 1.0.0
 */
export class Refinement {
  readonly _tag = "Refinement"
  constructor(
    readonly ast: AST.Refinement<AST.AST>,
    readonly actual: unknown,
    readonly kind: "From" | "Predicate",
    readonly error: ParseIssue
  ) {}
}

/**
 * Error that occurs when a declaration has an error.
 *
 * @category model
 * @since 1.0.0
 */
export class Declaration {
  readonly _tag = "Declaration"
  constructor(readonly ast: AST.Declaration, readonly actual: unknown, readonly error: ParseIssue) {}
}

/**
 * Error that occurs when a member in a union has an error.
 *
 * @category model
 * @since 1.0.0
 */
export class Member {
  readonly _tag = "Member"
  constructor(readonly ast: AST.AST, readonly error: ParseIssue) {}
}

/**
 * Error that occurs when a union has an error.
 *
 * @category model
 * @since 1.0.0
 */
export class Union {
  readonly _tag = "Union"
  constructor(
    readonly ast: AST.Union,
    readonly actual: unknown,
    readonly errors: ReadonlyArray.NonEmptyReadonlyArray<Type | TypeLiteral | Member>
  ) {}
}

/**
 * `ParseIssue` is a type that represents the different types of errors that can occur when decoding/encoding a value.
 *
 * @category model
 * @since 1.0.0
 */
export type ParseIssue =
  | Declaration
  | Refinement
  | Tuple
  | TypeLiteral
  | Union
  | Transformation
  | Type
  | Forbidden

/**
 * @category constructors
 * @since 1.0.0
 */
export const missing: Missing = new Missing()

/**
 * @category optimisation
 * @since 1.0.0
 */
export const mapBoth: {
  <E, E2, A, A2>(
    options: { readonly onFailure: (e: E) => E2; readonly onSuccess: (a: A) => A2 }
  ): <R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A2, E2, R>
  <A, E, R, E2, A2>(
    self: Effect.Effect<A, E, R>,
    options: { readonly onFailure: (e: E) => E2; readonly onSuccess: (a: A) => A2 }
  ): Effect.Effect<A2, E2, R>
} = dual(2, <A, E, R, E2, A2>(
  self: Effect.Effect<A, E, R>,
  options: { readonly onFailure: (e: E) => E2; readonly onSuccess: (a: A) => A2 }
): Effect.Effect<A2, E2, R> => {
  const s: any = self
  if (s["_tag"] === "Left") {
    return Either.left(options.onFailure(s.left))
  }
  if (s["_tag"] === "Right") {
    return Either.right(options.onSuccess(s.right))
  }
  return Effect.mapBoth(self, options)
})

/**
 * @category optimisation
 * @since 1.0.0
 */
export const orElse: {
  <E, A2, E2, R2>(
    f: (e: E) => Effect.Effect<A2, E2, R2>
  ): <A, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A2 | A, E2, R2 | R>
  <A, E, R, A2, E2, R2>(
    self: Effect.Effect<A, E, R>,
    f: (e: E) => Effect.Effect<A2, E2, R2>
  ): Effect.Effect<A2 | A, E2, R2 | R>
} = dual(2, <A, E, R, A2, E2, R2>(
  self: Effect.Effect<A, E, R>,
  f: (e: E) => Effect.Effect<A2, E2, R2>
): Effect.Effect<A2 | A, E2, R2 | R> => {
  const s: any = self
  if (s["_tag"] === "Left") {
    return f(s.left)
  }
  if (s["_tag"] === "Right") {
    return s
  }
  return Effect.catchAll(self, f)
})

/**
 * @since 1.0.0
 */
export type DecodeUnknown<Out, R> = (u: unknown, options?: AST.ParseOptions) => Effect.Effect<Out, ParseIssue, R>

/**
 * @since 1.0.0
 */
export type DeclarationDecodeUnknown<Out, R> = (
  u: unknown,
  options: AST.ParseOptions,
  ast: AST.Declaration
) => Effect.Effect<Out, ParseIssue, R>
