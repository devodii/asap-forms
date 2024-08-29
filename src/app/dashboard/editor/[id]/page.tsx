import { getForm, getFormSubmissions } from "@/actions/form"
import { FormBuilder } from "@/components/form-builder"
import { Wrapper } from "@/components/wrapper"
import { Match, String } from "effect"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
  searchParams: {
    tab: string
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const form = await getForm(params.id)

  return { title: String.capitalize(form?.title ?? "Untitled Form"), description: form?.description }
}

export default async function EditPage({ params, searchParams }: Props) {
  const { id } = params

  const form = await getForm(id)

  return Match.type<typeof form>().pipe(
    Match.when(undefined, () => notFound()),
    Match.orElse(async (form) => {
      if (searchParams.tab == "responses") {
        const responses = await getFormSubmissions(form.id)
        return (
          <Wrapper>
            <div className="max-w-4xl">
              <ul className="grid grid-cols-1">
                {responses.map((el) => (
                  <li key={el.id}>{JSON.stringify(el.data)}</li>
                ))}
              </ul>
            </div>
          </Wrapper>
        )
      }

      return (
        <Wrapper>
          <FormBuilder id={params.id} metadata={form} />
        </Wrapper>
      )
    }),
  )(form)
}
