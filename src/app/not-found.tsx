import { Wrapper } from "@/components/wrapper"

export default function FourOhFour() {
  return (
    <Wrapper>
      <section className="flex flex-col gap-4">
        <div className="text-center text-2xl md:text-3xl">404: Page Not Found</div>
        <span className="text-center text-xl text-gray-800">
          Sorry, the page you are looking for could not be found.
        </span>
      </section>
    </Wrapper>
  )
}
