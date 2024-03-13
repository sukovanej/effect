import type { ParseOptions } from "@effect/schema/AST"
import * as Parser from "@effect/schema/Parser"
import * as S from "@effect/schema/Schema"
import { Bench } from "tinybench"

/*
┌─────────┬──────────────────────────────────────────┬─────────────┬────────────────────┬──────────┬─────────┐
│ (index) │                Task Name                 │   ops/sec   │ Average Time (ns)  │  Margin  │ Samples │
├─────────┼──────────────────────────────────────────┼─────────────┼────────────────────┼──────────┼─────────┤
│    0    │   'Schema.decodeUnknownEither (good)'    │  '895,956'  │ 1116.1254758522336 │ '±0.74%' │ 895957  │
│    1    │   'Parser.decodeUnknownEither (good)'    │  '920,683'  │ 1086.1500037698897 │ '±0.51%' │ 920684  │
│    2    │    'Schema.decodeUnknownEither (bad)'    │  '51,965'   │ 19243.401944836874 │ '±7.55%' │  51966  │
│    3    │    'Parser.decodeUnknownEither (bad)'    │ '1,026,508' │ 974.1762449907689  │ '±1.75%' │ 1026509 │
└─────────┴──────────────────────────────────────────┴─────────────┴────────────────────┴──────────┴─────────┘
*/

const bench = new Bench({ time: 1000 })

const schema = S.array(S.string)

const good = ["a", "b", "c"]

const bad = ["a", 2, "c"]

const schemadecodeUnknownEither = S.decodeUnknownEither(schema)
const parseResultdecodeUnknownEither = Parser.decodeUnknownEither(schema)
const options: ParseOptions = { errors: "all" }

bench
  .add("Schema.decodeUnknownEither (good)", function() {
    schemadecodeUnknownEither(good, options)
  })
  .add("Parser.decodeUnknownEither (good)", function() {
    parseResultdecodeUnknownEither(good, options)
  })
  .add("Schema.decodeUnknownEither (bad)", function() {
    schemadecodeUnknownEither(bad, options)
  })
  .add("Parser.decodeUnknownEither (bad)", function() {
    parseResultdecodeUnknownEither(bad, options)
  })

await bench.run()

console.table(bench.table())
