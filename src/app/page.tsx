import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-gray-50">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-24 py-12">
        <h4 className="text-center text-4xl font-semibold">
          Build better forms
        </h4>
        <p className="text-md flex text-center text-secondary-foreground">
          Recieve feedback from your users in less than one minute
        </p>

        <Button asChild className="mx-auto w-full max-w-xl">
          <Link href="/sign-up">Start</Link>
        </Button>
      </div>
    </div>
  )
}
