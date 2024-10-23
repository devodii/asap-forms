import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Auth",
      authorize: (credentials, req) => {
        console.log({ credentials, req })
        return null
      },
      credentials: {
        username: { label: "", type: "" },
        password: { label: "", type: "" },
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
})

export { handler as GET, handler as POST }
