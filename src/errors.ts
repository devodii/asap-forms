import { Data, Match, Types, pipe } from "effect"

export class InvalidUserError extends Data.TaggedError("InvalidUserError")<{}> {}
export class NotFoundError extends Data.TaggedError("NotFoundError")<{}> {}

export type Error = InvalidUserError | NotFoundError

export const makeErrorMessage = (error: Types.Tags<Error>) => {
  return Match.type<Types.Tags<Error>>().pipe(
    Match.when("InvalidUserError", () => "User not found"),
    Match.when("NotFoundError", () => "Requested resource not found"),
    Match.orElse(() => "An unknown error occurred"),
  )(error)
}
