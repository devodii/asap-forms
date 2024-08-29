"use client"

import { fieldsAtom } from "@/atoms/fields-atom"
import { SelectMix } from "@/components/mixins/select-mix"
import { SwitchMix } from "@/components/mixins/switch-mix"
import { OverrideProps } from "@/types"
import { Option, pipe } from "effect"
import { useSetAtom } from "jotai"
import { useCallback, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import { InputMix, type Props as InputMixProps } from "./mixins/input-mix"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { MdArrowBack } from "react-icons/md"

interface Item extends OverrideProps<Partial<InputMixProps>, { id: string; type: string }> {
  title: string
  description?: string
}

interface Props {
  item: Item
  displayActions: boolean
  isEditable: boolean
}

export const FieldCard = ({ item, displayActions, isEditable }: Props) => {
  const setFields = useSetAtom(fieldsAtom)
  const [isEditing, setIsEditing] = useState(false)
  const [localTitle, setLocalTitle] = useState(item.title)
  const [error, setError] = useState(false)

  const handleTitleChange = (value: string) => {
    setLocalTitle(value)
  }

  const handleBlur = useCallback(
    (item: Item) => {
      if (localTitle.length == 0) return setError(true)
      setIsEditing(false)
      setFields((prev) =>
        Option.some(
          pipe(prev, Option.getOrThrow).map((field) =>
            field.id === item.id ? { ...field, title: localTitle } : field,
          ),
        ),
      )
    },
    [localTitle, setFields],
  )

  const hanleDelete = () =>
    setFields((prev) => Option.some([...pipe(prev, Option.getOrThrow).filter((field) => field.id !== item.id)]))

  const handleToggleIsRequired = (value: boolean) => {
    setFields((prev) =>
      Option.some(
        pipe(prev, Option.getOrThrow).map((field) => (field.id === item.id ? { ...field, required: value } : field)),
      ),
    )
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border p-4 shadow-sm md:p-6">
      {isEditable && isEditing ? (
        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="flex items-center justify-center rounded-full px-1.5 py-0"
                onClick={() => handleBlur(item)}
              >
                <MdArrowBack className="text-xl" />
              </Button>

              <Input
                key={item.title}
                id={item.id}
                value={localTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-96"
              />
            </div>

            <SelectMix
              trigger="Select Type"
              contents={[{ label: "Text", value: "text" }]}
              triggerClassName="w-full max-w-sm"
              defaultValue="text"
            />
          </div>

          {error && <span className="ml-12 text-xs text-red-500">Title cannot be empty</span>}
        </div>
      ) : (
        <InputMix
          {...item}
          key={item.title}
          id={item.title}
          {...(isEditable && { titleOnClick: () => setIsEditing(true) })}
          titleClassName="cursor-text"
        />
      )}

      {displayActions && isEditable && (
        <ActionTab
          onDelete={hanleDelete}
          onToggleIsRequired={handleToggleIsRequired}
          defaultRequired={item.required ?? false}
        />
      )}
    </div>
  )
}

interface ActionTabProps {
  onDelete: () => void
  onToggleIsRequired: (e: boolean) => void
  defaultRequired: boolean
}

export const ActionTab = ({ onDelete, onToggleIsRequired, defaultRequired }: ActionTabProps) => {
  return (
    <div className="ml-auto flex w-full items-center justify-end gap-2 border-t pt-4">
      <RiDeleteBin6Line className="text-xl text-gray-500" onClick={onDelete} />

      <SwitchMix
        id="required"
        label="Required"
        containerClassName="w-max"
        labelClassName="font-normal text-gray-700"
        onCheckedChange={onToggleIsRequired}
        defaultChecked={defaultRequired}
      />
    </div>
  )
}
