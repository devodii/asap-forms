import { FormField } from "@/types"
import { Option } from "effect"
import { atom } from "jotai"

export const fieldsAtom = atom<Option.Option<FormField[]>>(Option.some([]))

export const titleAtom = atom<Option.Option<string>>(Option.some("Untitled Form"))

export const descriptionAtom = atom<Option.Option<string | null>>(Option.none())
