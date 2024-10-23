import { Button } from "@/components/ui/button"
import { Wrapper } from "@/components/wrapper"
import Link from "next/link"

export default function Home() {
  return (
    <Wrapper className="gap-2">
      <h4 className="text-center text-4xl font-semibold">Build better forms</h4>
      <p className="text-md flex text-center text-secondary-foreground">
        Recieve feedback from your users in less than one minute
      </p>

      <Button asChild className="mx-auto w-full max-w-xl">
        <Link href="/sign-up">Start building</Link>
      </Button>
    </Wrapper>
  )
}
