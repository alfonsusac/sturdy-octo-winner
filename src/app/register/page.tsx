import { getSession } from "@/lib/next-auth"
import RegisterForm from "./form"
import { delay } from "@/lib/util"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { zfd } from "zod-form-data"
import { getUserDefaultImage } from "@/controller/user"

/**
 *  The Register Page should:
 *  - ✅ redirect user to /auth if not logged in
 *  - ✅ prefill the form with oauth profile
 *  - ✅ submit new user to the database
 *  - ✅ redirect to app if 
 */

export default async function Page() {

  const { email, name, image } = await getSession()

  // Check if user already exist in the database. Since this page is only for new users
  const user = await prisma.user.findUnique({ where: { email } })
  if (user) redirect("/app")

  // idempotent:
  // find existing id if not exist then create
  const userDefaultImage = await getUserDefaultImage(email)

  async function registerNewUser(formData: FormData) {
    "use server"
    try {
      const { email, provider } = await getSession()

      //Validate user input
      const schema = zfd.formData({
        username: zfd.text(),
        displayname: zfd.text(),
        profilepicture: zfd.text(),
      })
      const { username, displayname, profilepicture } = schema.parse(formData)

      // Create user
      await prisma.user.create({
        data: {
          provider: [provider],
          email,
          username: username,
          displayName: displayname,
          profilePicture: profilepicture,
        },
      })
    } catch (error: any) {
      console.log("Error Occured")
      console.error(error)
      redirect(`/register?error=${encodeURIComponent(error.message)}`)
    }
    redirect("/app")
  }

  return (
    <div className="bg-[#212432] h-screen flex flex-col justify-center items-center">
      <div className="max-w-sm w-full flex flex-col items-start">
        <h1 className="text-3xl font-semibold leading-loose">
          Almost There! 👋
        </h1>
        <p className="rounded-md mb-4">
          Before we let you in, we need to know what you want to be called
        </p>
        <RegisterForm
          action={ registerNewUser }
          defaultDisplayname={ name ?? "" }
          defaultUsername={ email.split('@')[0] ?? "" }
          // https://www.dicebear.com/styles/bottts-neutral/
          defaultProfilepicture={ `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${userDefaultImage?.id}` }
          suggestProfilepicture={ image ?? "" }
        />
      </div>
    </div>
  )
}
