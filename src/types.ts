/** field: value */
export interface SubmissionData extends Record<string, string> {}

export interface FormData {
  fields: {
    name: string
  }[]
}
