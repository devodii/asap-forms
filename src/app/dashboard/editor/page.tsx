import { Wrapper } from "@/components/wrapper"
import { getAccountForms } from "@/actions/form"
import Link from "next/link"
import { CreateEmptyForm } from "@/components/create-empty-form"

export default async function EditorPage() {
  const forms = await getAccountForms()

  return (
    <Wrapper>
      <div className="w-full">
        {forms.length == 0 ? (
          <div className="flex w-full flex-col items-center gap-4 justify-self-center">
            <p>Its a bit empty here</p>
            <CreateEmptyForm text="Create My First Form" />
          </div>
        ) : (
          <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {forms.map((form) => (
              <li key={form.id} className="flex h-[10rem] items-center justify-center rounded-md border">
                <Link
                  className="h-full w-full cursor-pointer p-4 hover:bg-[240_4.8%_95_9%]"
                  href={`/dashboard/editor/${form.id}`}
                >
                  {form.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Wrapper>
  )
}
