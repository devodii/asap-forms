import { buttonVariants } from "@/components/ui/button"
import { Heading, Html, Link, Section, Text } from "@react-email/components"

interface Props {
  link: string
}

export const ResetPasswordTemplate = ({ link }: Props) => {
  return (
    <Html lang="en">
      <Section className="my-6">
        <Heading as="h2">Hi, please click on the reset button to reset your password</Heading>
        <Link href={link} className={buttonVariants({ variant: "default", size: "lg" })}>
          Reset
        </Link>

        <Text>This link is only valid for an hour.</Text>
      </Section>
    </Html>
  )
}
