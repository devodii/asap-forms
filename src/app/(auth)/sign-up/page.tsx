import { DetailedInput } from "@/components/detailed-input"
import { Button } from "@/components/ui/button"
import { Wrapper } from "@/components/wrapper"

export default function SignUpPage() {
  return (
    <Wrapper className="items-start">
      <section className="container mx-auto flex max-w-4xl flex-col gap-4">
        <h4 className="text-center text-3xl font-medium">Create an Account</h4>
        <DetailedInput name="email" title="Email" id="email" />
        <DetailedInput name="password" title="Password" id="password" />
        <Button>Register</Button>
      </section>
    </Wrapper>
  )
}
