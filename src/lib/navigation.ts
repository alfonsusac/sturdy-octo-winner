import chalk from "chalk"
import { redirect as nextRedirect } from "next/navigation"
import "server-only"

export default function redirect(path: string, reason?: string):never {
  console.log(chalk.yellow("Redirecting to:"), path, reason ? `Reason: ${reason}` : "")
  nextRedirect(path)
}