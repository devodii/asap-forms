import { Types } from "effect"

/** field: value */
export interface SubmissionData extends Record<string, string> {}

export interface FormField {
  id: string
  title: string
  type: string
  description?: string
  required: boolean
}

export interface FormDetails {
  fields: FormField[]
}

export interface CreateFormDto {
  title: string
  description: string | null
  details: {
    fields: FormField[]
  }
}

export type OverrideProps<Base, Extend> = Extend & Omit<Base, keyof Extend>

export type MixinProps<Mixin extends string, Props> = {
  [Key in keyof Props as `${Mixin}${Capitalize<Key & string>}`]: Props[Key]
}

export type SplitProps<Props, Mixins extends string[]> = {
  [Mixin in Mixins[number]]: {
    [MixinKey in keyof Props as MixinKey extends `${Mixin}${infer Key}` ? Uncapitalize<Key> : never]: Props[MixinKey]
  }
} & {
  rest: Types.Simplify<
    Omit<
      Props,
      {
        [Mixin in Mixins[number]]: keyof {
          [MixinKey in keyof Props as MixinKey extends `${Mixin}${string}` ? MixinKey : never]: never
        }
      }[Mixins[number]]
    >
  >
}
