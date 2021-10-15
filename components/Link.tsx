import { Link } from "@chakra-ui/react"
import NextLink from "next/link"

export default ({ href, children }) => {
  return (
    <Link as={NextLink} href={href}>
      {children}
    </Link>
  )
}
