/* eslint-disable @next/next/no-img-element */
'use client'

import { cn } from "@/lib/tailwind"
import { SVGProps } from "react"

export default function ProfilePicture(p: {
  setLoading: (val: boolean) => void,
  setError: (val: boolean) => void,
  loading: boolean,
  error: boolean,
  pictureLink: string,
  defaultPictureLink: string,
}) {

  const { setLoading, setError, loading, error } = p
  return (
    <div className="h-16 w-16 rounded-full overflow-hidden relative">
      {
        loading && <div className="h-16 w-16 absolute bg-black/40 top-0 left-0 flex flex-col items-center justify-center">
          {
            !error && <SvgSpinners180RingWithBg className="text-4xl opacity-60" />
          }
          {
            error && <>
              <FluentErrorCircle12Filled className="text-4xl opacity-60" />
              <div className="text-sm">
                Invalid URL
              </div>
            </>
          }
        </div>
      }
      <img
        className={ cn(
          "h-16 w-16 absolulte text-transparent z-10",
          error && "opacity-0",
        ) }
        src={ p.pictureLink.length ? p.pictureLink : p.defaultPictureLink }
        alt="Display Picture Preview"
        onInvalid={ () => alert("Image Load Error") }
        onLoad={ () => setLoading(false) }
        onError={ () => setError(true) }
      />
      <input
        type="hidden"
        value={ p.pictureLink.length ? p.pictureLink : p.defaultPictureLink } 
        name="profilepicture" 
        />
    </div>
  )
}


export function SvgSpinners180RingWithBg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" { ...props }><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"></path><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>
  )
}

export function FluentErrorCircle12Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" { ...props }><path fill="currentColor" d="M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10Zm-.75-2.75a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0Zm.258-4.84a.5.5 0 0 1 .984 0l.008.09V6l-.008.09a.5.5 0 0 1-.984 0L5.5 6V3.5l.008-.09Z"></path></svg>
  )
}