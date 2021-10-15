import { Link } from "@chakra-ui/react"
import NextLink from "next/link"

const LinkComponent = ({ href, children }) => {
  return (
    <Link as={NextLink} href={href}>
      {children}
    </Link>
  )
}
export default LinkComponent
