"use client"

import { DetailedInput } from "@/components/detailed-input"
import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { Wrapper } from "@/components/wrapper"
import { Error, makeErrorMessage } from "@/errors"
import { Effect, Either } from "effect"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface Props<E> {
  handleSubmit: (dto: { email: string; password: string }) => Effect.Effect<void, E>
  title: string
  ctaText: string
}

export const AuthForm = <E extends Error>({ handleSubmit, title, ctaText }: Props<E>) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { push } = useRouter()

  const submitHandler = (e: any) =>
    Effect.gen(function* () {
      e.preventDefault()

      if (loading) return
      setLoading(true)

      const either = yield* handleSubmit({ email, password }).pipe(Effect.either)

      setLoading(false)

      if (Either.isLeft(either)) return toast.error(makeErrorMessage(either.left._tag))

      push("/editor")
    }).pipe(Effect.runPromise)

  return (
    <Wrapper className="items-start">
      <h4 className="w-full text-center text-3xl font-medium">{title}</h4>
      <form onSubmit={submitHandler} className="container mx-auto flex max-w-4xl flex-col gap-4">
        <DetailedInput value={email} onChange={(e) => setEmail(e.target.value)} title="Email" id="email" />
        <DetailedInput value={password} onChange={(e) => setPassword(e.target.value)} title="Password" id="password" />
        <Button type="submit" className="flex items-center gap-1">
          <span className="font-medium">{ctaText}</span>
          {loading && <Spinner />}
        </Button>
      </form>
    </Wrapper>
  )
}
