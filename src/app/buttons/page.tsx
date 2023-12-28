import { Button } from "@/components/base/button"
import { ButtonBase, LoginButton } from "@/components/ui/button"
import { Icon } from '@iconify/react'

export default function AuthPage() {

  return (
    <main className="min-h-screen w-full gap-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">
        Log in
      </h1>

      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <ButtonBase>
          Sign In
        </ButtonBase>

        <ButtonBase primary>
          Sign In
        </ButtonBase>

        <div className="flex flex-row items-center">
          <ButtonBase square><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"></path></svg></ButtonBase>
          <ButtonBase square><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="m16 12l2 2v2h-5v6l-1 1l-1-1v-6H6v-2l2-2V5H7V3h10v2h-1v7Z"></path></svg></ButtonBase>
          <ButtonBase square><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"></path></svg></ButtonBase>
          <ButtonBase square><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z"></path></svg></ButtonBase>
          <ButtonBase primary>New</ButtonBase>
          <ButtonBase square primary><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"></path></svg></ButtonBase>
        </div>

        <ButtonBase primary block>Sign In</ButtonBase>

        <div className="flex flex-row gap-2">
          <ButtonBase primary>Sign In</ButtonBase>
          <ButtonBase primary loading>Sign In</ButtonBase>
          <ButtonBase primary success>Sign In</ButtonBase>
        </div>
        <div className="flex flex-row gap-2">
          <ButtonBase secondary>Sign In</ButtonBase>
          <ButtonBase secondary loading>Sign In</ButtonBase>
          <ButtonBase secondary success>Sign In</ButtonBase>
        </div>

        <div className="flex flex-row gap-2">
          <ButtonBase>Sign In</ButtonBase>
          <ButtonBase loading>Sign In</ButtonBase>
          <ButtonBase success>Sign In</ButtonBase>
        </div>

        <div className="flex flex-row">
          <ButtonBase square large><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"></path></svg></ButtonBase>
          <ButtonBase square large><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"></path></svg></ButtonBase>
          <ButtonBase square large><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="m16 12l2 2v2h-5v6l-1 1l-1-1v-6H6v-2l2-2V5H7V3h10v2h-1v7Z"></path></svg></ButtonBase>
          <ButtonBase square large><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"></path></svg></ButtonBase>
          <ButtonBase square large><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z"></path></svg></ButtonBase>
          <ButtonBase primary large>New</ButtonBase>
        </div>

        <ButtonBase primary block large>Sign In</ButtonBase>

        <div className="flex flex-row gap-2">
          <ButtonBase primary large>Sign In</ButtonBase>
          <ButtonBase primary loading large>Sign In</ButtonBase>
          <ButtonBase primary success large>Sign In</ButtonBase>
        </div>
        <div className="flex flex-row gap-2">
          <ButtonBase secondary large>Sign In</ButtonBase>
          <ButtonBase secondary loading large>Sign In</ButtonBase>
          <ButtonBase secondary success large>Sign In</ButtonBase>
        </div>
        <div className="flex flex-row gap-2">
          <ButtonBase large>Sign In</ButtonBase>
          <ButtonBase loading large>Sign In</ButtonBase>
          <ButtonBase success large>Sign In</ButtonBase>
        </div>

        <button type="submit" className="text-xs bg-indigo-600 h-7 py-0 px-6 mt-2 font-medium rounded-sm"
          disabled={ true }>Save</button>
        <button type="submit" className="text-xs bg-indigo-600 h-7 py-0 px-6 mt-2 font-medium rounded-sm"
          disabled={ false }>Save</button>
      </div>

    </main>
  )
}

