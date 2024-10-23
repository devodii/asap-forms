import db from "@/db"
import { compare } from "@/lib/hash"
import { Effect, Option, pipe } from "effect"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handleAuthorize = async (dto: { email: string; password: string }) =>
  Effect.gen(function* () {
    const user = yield* Effect.promise(
      async () => await db.query.account.findFirst({ where: ({ email }, { eq }) => eq(email, dto.email) }),
    )

    if (!user) return null

    const isValidPassword = Effect.promise(async () => await compare(dto.password, user.password as string))

    if (user && isValidPassword) return user

    return null
  }).pipe(Effect.runPromise)

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Auth",
      authorize: (credentials) => {
        return pipe(credentials, Option.fromNullable, (_) =>
          Option.isSome(_) ? handleAuthorize({ ...Option.getOrThrow(_) }) : null,
        )
      },
      credentials: {
        email: { label: "", type: "" },
        password: { label: "", type: "" },
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
})

export { handler as GET, handler as POST }
