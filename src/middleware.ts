import { black, cyan, gray } from "ansis"
import { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  printRequestType(request)
}




// Utils

function printRequestType(request: NextRequest) {
  const path = request.nextUrl.pathname
  if (path.includes('/_next/static/chunks/')) {
    console.log(gray("→ GET static chunk"), black(path.split('/_next/static/chunks/')[1]))
  }
  else if (path.includes('/_next/static/css/')) {
    console.log(gray("→ GET static asset"), black(path.split('/_next/static/css/')[1]))
  }
  else if (request.headers.get('sec-fetch-dest') === 'document') {
    console.log(`\n→ ${ cyan("GET document") }`, path)
  }
  else if (request.headers.get('next-action')) {
    console.log(`→ ${ cyan("POST action") }`, path, request.headers.get('next-action'))
  }
  else if (request.method === "POST") {
    console.log(`→ ${ cyan("POST") }`, path)
  }
  else if (!request.headers.has('next-url')) {
    console.log(`→ ${ cyan("GET fetch") }`, path)
  }
  else if (request.headers.has('next-url')) {
    console.log(`→ ${ cyan("GET RSC") }`, path)
  }
  else {
    console.log(`→ ${ cyan(request.method) }`, path, request.headers.get('sec-fetch-dest'), request.headers.get('sec-fetch-mode'))
    console.log("  geo:", request.geo)
    console.log("  ip:", request.ip)
    console.log("  nexturl (object):", request.nextUrl.toString())
    console.log("  url:", request.url)
    console.log("  bodyUsed:", request.bodyUsed)
    console.log("  cache:", request.cache)
    console.log("  credentials:", request.credentials)
    console.log("  destination:", request.destination)
    console.log("  integrity:", request.integrity)
    console.log("  keepalive:", request.keepalive)
    console.log("  method:", request.method)
    console.log("  mode:", request.mode)
    console.log("  redirect:", request.redirect)
    console.log("  referrer:", request.referrer)
    console.log("  referrerPolicy:", request.referrerPolicy)
    console.log("  headers:")
    request.headers.forEach((val, key) => {
      if (key !== "cookie" && key !== "user-agent")
        console.log(`    ${ key }:`, val)
    })
  }
}