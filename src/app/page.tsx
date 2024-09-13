import { Waitlist } from "@/components/waitlist"

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-gray-50">
      <b className="text-3xl font-medium">Asap Forms</b>
      <p className="text-xl text-foreground">
        Get feedback from your customers in less than a minute
      </p>
      <Waitlist />
    </div>
  )
}
