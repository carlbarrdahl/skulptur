import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"

const Link = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}
export default Link
