import { FormEditorHeader } from "@/components/editor-header"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  params: {
    id: string
  }
}

export default function EditorLayout({ children, params }: Readonly<Props>) {
  return (
    <section>
      <FormEditorHeader shareLink={`${process.env.NEXTAUTH_URL}/${params.id}`} />
      <>{children}</>
    </section>
  )
}
