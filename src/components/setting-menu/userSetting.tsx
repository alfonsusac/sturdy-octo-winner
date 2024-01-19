import updateProfilePicture from "@/actions/session/update-pfp-action"
import { SettingPage, TabContent, TabTrigger, dividerStyle, tabTriggerStyle } from "@/components/base/settings"
import ChangeDisplaynameForm from "@/components/forms/change-displayname"
import ImageCropper from "@/components/modal/image-cropper"
import LogoutButton from "@/components/ui/logout"
import { useSession } from "@/lib/auth/next-auth.client"
import { SVGProps } from "react"
import { upload } from "../lib/upload"

export default function UserSettingView(p: {
  children: React.ReactNode
}) {
  const session = useSession()
  return (
    <SettingPage
      trigger={ p.children }
      title="User Settings"
      firstValue="My Account"
      tabs={
        <>
          <TabTrigger value="My Account">My Account</TabTrigger>
          <TabTrigger value="Profile">Profile</TabTrigger>
          <TabTrigger value="Appearance">Appearance</TabTrigger>
          <TabTrigger value="Language">Language</TabTrigger>
          <hr className={ dividerStyle } />
          <LogoutButton>
            <button className={ tabTriggerStyle }>
              Log Out
              <FluentSignOut20Filled className="text-lg" />
            </button>
          </LogoutButton>
        </>
      }
    >
      <TabContent value="My Account">
        {/* Content Header */ }
        <div className="text-lg font-semibold mb-4">My Account</div>

        {/* Content Content */ }
        <div className="w-full rounded-lg overflow-hidden">
          <div className="w-full h-20 bg-indigo-900" />
          <div className="bg-[#171a24] p-4 ">
            {/* Header of user card */ }
            <div className="flex gap-2 items-start relative h-10">
              <div className="bg-[#171a24] w-20 h-20 rounded-full overflow-hidden p-1.5 absolute  bottom-0">
                <ImageCropper
                  className="rounded-full"
                  width={ 256 }
                  defaultValue={ session.data?.user.image }
                  onCrop={ async (img) => {
                    const user = session.data?.user
                    if(!user) throw new Error("Not Authenticated")

                    // const buffer2 = await fetch(dataURL).then(res => res.blob())
                    // const buffer = Buffer.from(dataURL.replace(/^data:image\/\w+;base64,/, ""), 'base64')
                    // const uploadURL = await getPresignedURLForUserProfilePicture()
                    // if (!uploadURL) throw new Error('Something went wrong when prefetching presigned URL')
                    // const res = await fetch(uploadURL, {
                    //   method: "PUT", body: img.blob,
                    // })
                    // const newImageUrl = uploadURL.split('?')[0]
                    
                    await session.update("update-display-picture",
                      async () => await updateProfilePicture(
                        {
                          pfp: await upload(img.blob, `user/${user.userid}${user.image?.at(-5) === '0' ? "1" : user.image?.at(-5) === "1" ? "0" : "1"}.png`)
                        }
                      )
                    )
                  }}
                />
              </div>
              <div className="font-medium text-base pl-20 ml-2">{ session.data?.user.name }</div>
            </div>
            {/* Details of user card */ }
            <div className="bg-[#26293a] mt-4 w-full p-4 rounded-md flex flex-col gap-4">
              <div className="flex items-center">
                <div className="grow">
                  <div className="text-[0.65rem] uppercase font-semibold opacity-80">Display Name</div>
                  { session.data?.user.name }
                </div>
              </div>
              <div>
                <div className="text-[0.65rem] uppercase font-semibold opacity-80">Email</div>
                { session.data?.user.email }
              </div>
            </div>
          </div>
        </div>
        <div className="my-6 h-px w-full bg-indigo-300/10" />
        <div>
          <ChangeDisplaynameForm />
        </div>
      </TabContent>
      <TabContent value="Profile">
        Profile
      </TabContent>
      <TabContent value="Appearance">
        Appearance
      </TabContent>
      <TabContent value="Language">
        Language
      </TabContent>
    </SettingPage>
  )
}


export function FluentSignOut20Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" { ...props }><path fill="currentColor" d="M11 3.5a.5.5 0 0 0-.576-.494l-7 1.07A.5.5 0 0 0 3 4.57v10.86a.5.5 0 0 0 .424.494l7 1.071a.5.5 0 0 0 .576-.494V10h5.172l-.997.874a.5.5 0 0 0 .658.752l1.996-1.75a.5.5 0 0 0 0-.752l-1.996-1.75a.499.499 0 1 0-.658.752l.997.874H11V3.5Zm-2.5 7.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5Zm4 4.75H12v-5h1v4.5a.5.5 0 0 1-.5.5ZM12 8V4h.5a.5.5 0 0 1 .5.5V8h-1Z"></path></svg>
  )
}
