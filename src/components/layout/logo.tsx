import { Link } from "react-router"
import { SquareRoundedIcon } from "@/components/space/square-rounded-icon"

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-1.5 text-base font-bold tracking-tight md:text-lg"
    >
      <SquareRoundedIcon className="size-6 text-primary" />
      <span className="text-foreground">Dpopcorn</span>
    </Link>
  )
}
