import { Data, Match, Types, pipe } from "effect"

export class InvalidUserError extends Data.TaggedError("InvalidUserError")<{}> {}

export class NotFoundError extends Data.TaggedError("NotFoundError")<{}> {}

export class DuplicateRecordError extends Data.TaggedError("DuplicateRecordError")<{}> {}

export type Error = InvalidUserError | NotFoundError | DuplicateRecordError

export const makeErrorMessage = (error: Types.Tags<Error>) => {
  return Match.type<Types.Tags<Error>>().pipe(
    Match.when("InvalidUserError", () => "User not found"),
    Match.when("NotFoundError", () => "Requested resource not found"),
    Match.when("DuplicateRecordError", () => "Duplicate record"),
    Match.exhaustive,
  )(error)
}
