import { getForm } from "@/actions/form"
import { ViewForm } from "@/components/view-form"
import { Wrapper } from "@/components/wrapper"
import { Match, String } from "effect"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const form = await getForm(params.id)

  return { title: String.capitalize(form?.title ?? "Untitled Form"), description: form?.description }
}

export default async function PublicFormPage({ params }: Props) {
  const form = await getForm(params.id)

  return Match.type<typeof form>().pipe(
    Match.when(undefined, () => notFound()),
    Match.orElse((form) => (
      <Wrapper>
        <ViewForm id={form.id} form={form} />
      </Wrapper>
    )),
  )(form)
}
