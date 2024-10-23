import { Data, Match, Types, pipe } from "effect"

export class InvalidUserError extends Data.TaggedError("InvalidUserError")<{}> {}

export class NotFoundError extends Data.TaggedError("NotFoundError")<{}> {}

export class DuplicateRecordError extends Data.TaggedError("DuplicateRecordError")<{}> {}

export class UnknownError extends Data.TaggedError("UnknownError")<{}> {}

export type Error = InvalidUserError | NotFoundError | DuplicateRecordError | UnknownError

export const makeErrorMessage = (error: Types.Tags<Error>) => {
  return Match.type<Types.Tags<Error>>().pipe(
    Match.when("InvalidUserError", () => "User not found"),
    Match.when("NotFoundError", () => "Requested resource not found"),
    Match.when("DuplicateRecordError", () => "Duplicate record"),
    Match.when("UnknownError", () => "An unknown error occured"),
    Match.exhaustive,
  )(error)
}
