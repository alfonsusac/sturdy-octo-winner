import chalk from "chalk"
import path from "path"

export function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}

export function getExt(filename: string) {
  const extdot = path.extname(filename)
  if (extdot.split('.')[1]) {
    return extdot.split('.')[1]
  } else {
    throw new Error("This file has no extension")
  }
}

export function logFunc(obj: any) {
  console.log(chalk.white(obj))
}
export function logAuth(obj: any) {
  console.log(chalk.yellow(obj))
}