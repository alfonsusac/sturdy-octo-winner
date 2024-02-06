import { toast } from "sonner"

export function devtoast(...param: Parameters<typeof toast>) {
  if (process.env.NODE_ENV === "development") {
    toast(...param)
  }
}
