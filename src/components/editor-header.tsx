import { ShareForm } from "./share-form"
import Link from "next/link"

interface Props {
  shareLink: string
}

export const FormEditorHeader = ({ shareLink }: Props) => {
  return (
    <header className="fixed top-8 flex w-full items-center justify-between px-4 md:px-12">
      <div />

      <div className="flex gap-4">
        <Link href="?tab=questions">Questions</Link>
        <Link href="?tab=responses">Responses</Link>
      </div>

      <ShareForm link={shareLink} />
    </header>
  )
}
