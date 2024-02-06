import RegisterForm from "./form"
import { prisma } from "@/lib/server/prisma"
import { zfd } from "zod-form-data"
import { getUserDefaultImage } from "@/controller/user"
import { AcccountProvider } from "@prisma/client"
import redirect from "@/lib/server/navigation"
import { SessionProvider } from "@/lib/auth/next-auth.client"
import auth from "@/lib/server/auth"

/**
 *  The Register Page should:
 *  - ✅ redirect user to /auth if not logged in
 *  - ✅ prefill the form with oauth profile
 *  - ✅ submit new user to the database
 *  - ✅ redirect to app if 
 */

export default async function Page() {

  const session = await auth.getRawSession()
  if (!session || !session.user.provider || !session.user.sub)
    redirect('/auth', "No Session Found")

  // Check if user already exist in the database. Since this page is only for new users
  // const account = await prisma.user.find

  const account = await prisma.account.findUnique({
    where: {
      providerData: {
        providerType: session.user.provider as AcccountProvider,
        providerAccountId: session.user.sub
      }
    }
  })
  if (account) redirect('/app', "Account already registered")

  // idempotent:
  // find existing id if not exist then create
  const userDefaultImage = await getUserDefaultImage(session.user.sub)

  async function registerNewUser(formData: FormData) {
    "use server"
    try {
      const session = await auth.getSession()
      if (!session.provider || !session.sub) redirect('/auth')

      //Validate user input
      const schema = zfd.formData({
        username: zfd.text(),
        displayname: zfd.text(),
        profilepicture: zfd.text(),
      })
      const { username, displayname, profilepicture } = schema.parse(formData)

      // Create user
      const user = await prisma.user.create({
        data: {
          accounts: {
            create: {
              providerAccountId: session.sub,
              providerType: session.provider as AcccountProvider
            }
          },
          email: session.email!,
          username: username,
          displayName: displayname,
          profilePicture: profilepicture,
        },
      })

      return {
        error: undefined,
        success: true,
        data: {
          user,
          providerId: session.sub,
          provider: session.provider
        }
      }

    } catch (error: any) {
      console.log("Error Occured")
      console.error(error)
      return { error: "Error Occured", success: undefined }
      // Show server error message
      // redirect(`/register?error=${encodeURIComponent(error.message)}`)
    }
  }

  return (
    <div className="bg-[#212432] min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-sm w-full flex flex-col items-start">
        <h1 className="text-3xl font-semibold leading-loose">
          Almost There! 👋
        </h1>
        <p className="rounded-md mb-4">
          Before we let you in, we need to know what you want to be called
        </p>
        <SessionProvider session={session}>
          <RegisterForm
            action={ registerNewUser }
            defaultDisplayname={ session.user.name ?? "" }
            defaultUsername={ session.user.email?.split('@')[0] ?? "" }
            // https://www.dicebear.com/styles/bottts-neutral/
            defaultProfilepicture={ `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${userDefaultImage?.id}` }
            suggestProfilepicture={ "" }
          />
        </SessionProvider>
      </div>
    </div>
  )
}
