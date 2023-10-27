import BaseSettingView, { SettingTabTrigger, SettingsTabContent, settingTabTriggerStyle } from "@/app/app/_settings/base"
import LogoutButton from "@/components/ui/logout"
import { SVGProps } from "react"

export default function UserSettingView(p: {
  children:React.ReactNode
}) {
  return (
    <BaseSettingView
      trigger={ p.children }
      title="User Settings"
      firstValue="My Account"
      tabs={
        <>
          <SettingTabTrigger value="My Account">My Account</SettingTabTrigger>
          <SettingTabTrigger value="Profile">Profile</SettingTabTrigger>
          <SettingTabTrigger value="Appearance">Appearance</SettingTabTrigger>
          <SettingTabTrigger value="Language">Language</SettingTabTrigger>
          <div className="h-px bg-indigo-300/10 mx-2 my-2" />
          <LogoutButton>
            <button className={ settingTabTriggerStyle }>
              Log Out
              <FluentSignOut20Filled className="text-lg"/>
            </button>
          </LogoutButton>
          </>
      }
    >
      <SettingsTabContent value="My Account">
         My Account
      </SettingsTabContent>
      <SettingsTabContent value="Profile">
         Profile
      </SettingsTabContent>
      <SettingsTabContent value="Appearance">
         Appearance
      </SettingsTabContent>
      <SettingsTabContent value="Language">
         Language
      </SettingsTabContent>

    </BaseSettingView>
  )
}


export function FluentSignOut20Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" { ...props }><path fill="currentColor" d="M11 3.5a.5.5 0 0 0-.576-.494l-7 1.07A.5.5 0 0 0 3 4.57v10.86a.5.5 0 0 0 .424.494l7 1.071a.5.5 0 0 0 .576-.494V10h5.172l-.997.874a.5.5 0 0 0 .658.752l1.996-1.75a.5.5 0 0 0 0-.752l-1.996-1.75a.499.499 0 1 0-.658.752l.997.874H11V3.5Zm-2.5 7.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5Zm4 4.75H12v-5h1v4.5a.5.5 0 0 1-.5.5ZM12 8V4h.5a.5.5 0 0 1 .5.5V8h-1Z"></path></svg>
  )
}