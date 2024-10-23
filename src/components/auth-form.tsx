"use client"

import { DetailedInput } from "@/components/detailed-input"
import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { Wrapper } from "@/components/wrapper"
import { Error, makeErrorMessage } from "@/errors"
import { Effect, Either } from "effect"
import { useState } from "react"
import { toast } from "sonner"

export interface AuthDTO {
  email: string
  password: string
}

interface Props<E> {
  handleSubmit: (dto: AuthDTO) => Effect.Effect<void, E>
  title: string
}

export const AuthForm = <E extends Error>({ handleSubmit, title }: Props<E>) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const submitHandler = (e: any) =>
    Effect.gen(function* () {
      e.preventDefault()

      if (loading) return
      setLoading(true)

      const either = yield* handleSubmit({ email, password }).pipe(Effect.either)
      if (Either.isLeft(either)) toast.error(makeErrorMessage(either.left._tag))

      setLoading(false)
    }).pipe(Effect.runPromise)

  return (
    <Wrapper className="items-start">
      <h4 className="w-full text-center text-3xl font-medium">{title}</h4>
      <form onSubmit={submitHandler} className="container mx-auto flex max-w-4xl flex-col gap-4">
        <DetailedInput value={email} onChange={(e) => setEmail(e.target.value)} title="Email" id="email" />
        <DetailedInput value={password} onChange={(e) => setPassword(e.target.value)} title="Password" id="password" />
        <Button type="submit" className="flex items-center gap-1">
          <span className="font-medium">Sign in</span>
          {loading && <Spinner />}
        </Button>
      </form>
    </Wrapper>
  )
}
