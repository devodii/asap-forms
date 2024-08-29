import { OverrideProps } from "@/types"
import { InputMix, type Props as InputMixProps } from "@/components/mixins/input-mix"

interface Item extends OverrideProps<Partial<InputMixProps>, { id: string; type: string }> {
  title: string
  description?: string
}

export const FieldsCard = ({ items }: { items: Item[] }) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border p-4 shadow-sm md:p-6">
      {items.map((it) => (
        <InputMix {...it} key={it.title} />
      ))}
    </div>
  )
}
