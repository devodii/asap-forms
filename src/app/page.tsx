import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-gray-50 font-lato">
      <b className="text-2xl font-medium">Asap Forms</b>
      <p className="text-foreground">The Open source alternative for Jotform</p>
      <Badge variant="signal">Expired</Badge>
    </div>
  )
}
