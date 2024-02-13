import { Account, AuthOptions, CallbacksOptions, Session } from "next-auth"
import { isDevelopment, logAuth, strObj } from "../util"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { env } from "../env"
import chalk from "chalk"
import { JWT } from "next-auth/jwt"
import { getJWTfromOAuth, onUpdateHandler, registerUserHandler } from "./auth-callbacks"


export const authOptions: AuthOptions = {

  providers:
    isDevelopment ? [
      getGoogleProvider(),
      getDummyProvider()
    ] : [
      getGoogleProvider()
    ],

  callbacks: {
    jwt:
      handleJWTCallback({

        async onLogin(token, account) {
          return getJWTfromOAuth(account, token)
        },

        async onUpdate(token, data) {
          // About trigger === "update":
          // You can call the session.update() function to hit this
          //  callback and do the database mutation here
          // The ugly part is that when it errors,
          //  the token becomes invalid and server will crash

          // Therefore, I decided to validate and call server db
          //  first before calling session.update()
          // This is supported by the new useSession wrapper.
          if (data.purpose === "register") {
            return await registerUserHandler(data, token) as JWT
          }
          return await onUpdateHandler(data, token) as JWT
        }

      }),

    session:
      handleSessionCallbackUsingJWT({

        async onRetrieve(session, token) {
          // Session is retrieved from token (thats passed through jwt callback).
          // if using jwt, it seems that sessino is retrieved from token only returning default properties. (name, email, emage)
          // Therefore we need to re-assign them again

          // Mutate data for getServerSessions
          session.user.username = token.username ?? undefined
          session.user.provider = token.provider ?? undefined
          session.user.userid = token.userid ?? undefined
          session.user.sub = token.sub ?? undefined

          // Some attributes can't be overlapped (?) therefore reassign them in `user`
          const newNewSession = {
            ...session,
            user: {
              ...session.user,
              name: token.name ?? undefined,
              username: token.username ?? undefined,
              email: token.email ?? undefined,
              image: token.picture ?? undefined,
              provider: token.provider ?? undefined,
              userid: token.userid,
              sub: token.sub,
            }
          } satisfies Session

          // Return session for useSession
          return newNewSession
        }

      })
  }
}




// Providers

function getGoogleProvider() {
  return GoogleProvider({
    clientId: env('GOOGLE_CLIENT_ID'),
    clientSecret: env('GOOGLE_CLIENT_SECRET')
  })
}

function getDummyProvider() {
  return CredentialsProvider({
    name: 'Anya (Offline)',
    credentials: {},
    authorize() {
      return {
        id: 'aabbccdd-eeff-gghh-iijj-kkllmmnnoo',
        name: 'Anya Forger',
        email: 'anya.forget@yorfam.com'
      }
    }
  })
}



// Callback Handlers

type JWTCallbackParameter = Parameters<CallbacksOptions['jwt']>[0]
function logJWTCallbackFunction(params: JWTCallbackParameter) {
  logAuth(`Checking JWT | Trigger: ${ params.trigger ?? "check" }`)
  console.log(chalk.blue(" Token:"), strObj(params.token))
  console.log(chalk.blue(" Account:"), strObj(params.account))
  console.log(chalk.blue(" User:"), strObj(params.user))
  console.log(chalk.blue(" Profile:"), strObj(params.profile))
  console.log(chalk.blue(" Session:"), strObj(params.session))
}

function handleJWTCallback(
  handler: {
    onLogin?: (defaultToken: JWT, account: Account) => Promise<JWT>,
    onUpdate?: (previousToken: JWT, data: any) => Promise<JWT>,
    onRetrieve?: (previousToken: JWT) => Promise<JWT>,
  }
) {
  return async (params: JWTCallbackParameter) => {
    const { token, account, user, profile, session, trigger } = params
    const newToken = token
    // logJWTCallbackFunction(params)

    // During session checking, this callback is called normally
    await handler.onRetrieve?.(newToken)

    // During a request to update the session, this path is called
    if (trigger === "update" && session) {
      // At this stage, token is the previously used token.
      //  and session is the data from "update()" method called from client.

      // Whatever is pased into update() will be send here as `data`.
      return await handler.onUpdate?.(newToken, session) ?? newToken
    }

    // During SignIn, the account info is provided to this callback.
    if (trigger === "signIn" && account) {
      // At this stage, token is the default token made by NextAuth
      return await handler.onLogin?.(newToken, account) ?? newToken
    }

    return newToken
  }
}


type SessionCallbackParameter = Parameters<CallbacksOptions['session']>[0]
function logSessionCallbackFunction(params: SessionCallbackParameter) {
  logAuth(`Checking Session | Trigger: ${ params.trigger ?? "check" }`)
  console.log(chalk.blue(" Session:"), strObj(params.session))
  console.log(chalk.blue(" NewSession:"), strObj(params.newSession))
  console.log(chalk.blue(" Token:"), strObj(params.token))
  console.log(chalk.blue(" User:"), strObj(params.user))
}

function handleSessionCallbackUsingJWT(
  handler: {
    onRetrieve?: (prevSession: Session, token: JWT) => Promise<Session>
  }
) {

  return async (params: SessionCallbackParameter) => {
    const { newSession, session, token, trigger, user } = params

    return await handler.onRetrieve?.(session, token) ?? session
  }
}